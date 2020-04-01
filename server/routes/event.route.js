const Router = require("koa-router");
const router = new Router();
const {
  validate,
  Joi
} = require("../utils/joi-validator");
const {
  ACTION_TYPES
} = global.constants;
const {
  isParticipant
} = require("../middlewares/is-participant");
const {
  fetchToState
} = require('../middlewares/fetch-to-state');
const {
  uniqueElementsById,
  randomString,
  encryptCode
} = require("../utils/helpers");
const auth = require("../utils/bearer-auth");
const light = auth({
  fast: true
});
const {
  sendInviteEmailTo
} = require('../services/mailer');
const fetchEvent = fetchToState("id", "event");

let threads = require("./thread.event.route");
let actions = require("./action.event.route");
let tags = require("./tags.event.route");

router.use("/:id/tags", auth(), fetchEvent, isParticipant, tags.routes());
router.use("/:id/actions", auth(), fetchEvent, isParticipant, actions.routes());
router.use("/:id/thread", auth(), fetchEvent, isParticipant, threads.routes());




router.post(
  "/",
  auth(),
  validate({
    body: {
      title: Joi.string()
        .max(256)
        .required(),
      description: Joi.string()
        .max(256)
        .optional(),
      invites: Joi.array().items(Joi.string().email()).optional()
    }
  }),
  async ctx => {
    try {
      let event = await global.model.event.create({
        title: ctx.request.body.title,
        description: ctx.request.body.description,
        admins: [ctx.state.user.id],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        invite_code: randomString(3),
        participants: [ctx.state.user.id],
        thread: [],
        actions: [],
        tags: []
      });

      process.nextTick(async () => {
        let {
          invites
        } = ctx.request.body
        let users = await global.model.user.find({}).where('email').in(invites).lean();

        let mailers_list = invites.filter(inv => {
          if (!users.find(u => u.email === inv))
            return true;
        });
        let encrypted = encryptCode(event.invite_code);
        mailers_list.forEach(mail => sendInviteEmailTo(mail, global.config.FRONT_HOST + '/invite?hash=' + encrypted));
        users.forEach(u => {
          if (event.participants.find(p => p.toString() === u._id.toString())) {
            event.participants.push(u._id)
          }
        });
        await event.save();
      });

      ctx.status = 200;
      ctx.body = await event.getFullInfo();
    } catch (e) {
      console.error(e);
      ctx.throw(500);
    }
  }
);

router.get('/', auth(), async ctx => {
  let events = await global.model.event.find({
    participants: ctx.state.user.id
  }).lean();
  if (events.length > 0) {
    ctx.status = 200;

    ctx.body = events.map(e => {
      delete e.__v;
      delete e.thread;
      delete e.invite_code;
      return e;
    });
  } else {
    ctx.status = 200;
    ctx.body = []
  }
});
router.get('/count', auth(), async ctx => {
  let events = await global.model.event.find({
    participants: ctx.state.user.id
  });
  let actions = 0;
  events.forEach(e => actions += e.actions.length);
  ctx.status = 200;
  ctx.body = actions
})
router.get("/:id", auth(), fetchEvent, isParticipant, async ctx => {
  ctx.status = 200;
  let event = await ctx.state.event.getFullInfo();
  ctx.body = event;
});

router.post("/:id/invite", auth(), fetchEvent, isParticipant, async ctx => {
  ctx.state.event.invite_code = randomString(3);
  await ctx.state.event.save()
  let encrypted = encryptCode(ctx.state.event.invite_code);
  ctx.status = 200;
  ctx.body = {
    code: ctx.state.event.invite_code,
    url: global.config.FRONT_HOST + '/invite?hash=' + encrypted
  }
});

router.post("/:id/read", auth(), fetchEvent, isParticipant, async ctx => {
  let exist = false;
  for (let i = 0; i < ctx.state.user.pointers.length; i++) {
    let e = ctx.state.user.pointers[i];
    if (e.event.toString() === ctx.params.id) {
      ctx.state.user.pointers[i].date = Date.now();
      exist = true;
    }
  }
  if (!exist) {
    ctx.state.user.pointers.push({
      event: ctx.params.id,
      date: Date.now()
    })
  }
  await ctx.state.user.save();
  ctx.status = 200;
});

router.get('/:id/participants', auth(), fetchEvent, isParticipant, async ctx => {
  let participants = await global.model.user.find({}, 'name avatar role lastSeenAt')
    .where('_id')
    .in(ctx.state.event.participants).lean()
  ctx.status = 200;
  ctx.body = participants;
});

router.get("/:id/calculate", auth(), fetchEvent, isParticipant, async ctx => {
  let res = {
    "totalAmount": 0,
    "totalTurnover": 0,
    "actions": 0,
    "participants": 0,
    "debts": []
  };
  let payers = [];
  let stash = {
    amount: 0,
    users: {},
  };

  await ctx.state.event.populate({
    path: "actions.author"
  });

  let actions = ctx.state.event.actions;
  let payments = actions.filter(a => a.action_type === ACTION_TYPES.ADD_PAYMENT);

  payers = uniqueElementsById(payments.map(a => a.author));
  // заполнить общак. Кто и сколько вкинул.
  payments.forEach(p => {
    if (!stash.users[p.author.toString()])
      stash.users[p.author.toString()] = 0;

    //if(p.amount > 0) {
    stash.amount += p.amount;
    //}
    stash.users[p.author.toString()] += p.amount;
    res.totalTurnover += Math.abs(p.amount);
  })
  res.participants = payers.length;
  res.totalAmount = stash.amount;
  res.actions = payments.length;

  for (let k in stash.users) {
    let user = await global.model.user.findById(k).lean();
    res.debts.push({
      user: {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        role: user.role
      },
      amount: stash.users[k]
    })
  }
  ctx.status = 200;
  ctx.body = res;

});





function areAllValuesEqual(arr) {
  let val = arr[0];
  for (let k in arr)
    if (arr[k] != val) return false;
  return true;
}
// убивает погрешность в 1
function strangeOne(arr) {
  for (let k in arr)
    if (Math.abs(arr[k]) > 1) return false;
  return true;
}

router.get("/:id/calculate-legacy", auth(), fetchEvent, isParticipant, async ctx => {
  let res = {
    total: 0,
    payers: [],
    paymentChain: []
  };
  let model = [];
  let middle = 0;
  await ctx.state.event.populate({
    path: "actions.author"
  });
  let actions = ctx.state.event.actions;
  let payments = actions.filter(a => a.action_type === ACTION_TYPES.ADD_PAYMENT);

  res.payers = uniqueElementsById(payments.map(a => a.author));
  res.payers.forEach(p => model[p] = 0);

  // perform initial shuffling for regular payments
  payments.forEach(payment => {
    let {
      amount
    } = payment;
    // if(payment.meta.participants && payment.meta.participants[payment.author]){
    //   amount *= payment.meta.participants[k];
    // }
    const key = payment.author + ''
    model[key] -= amount;
    middle += amount;
  })

  middle /= Object.keys(model).length;
  // TODO убрать погрешность
  for (let k in model) model[k] += Math.floor(middle);
  let step = 0;
  // model - how much each participant should take, or give out
  while (!areAllValuesEqual(model)) {
    if (strangeOne(model)) break;
    console.log('step', step++);
    let min = res.payers[0].toString(),
      max = res.payers[0].toString();

    for (let k of res.payers) {
      const key = k.toString();
      if (model[max] < model[key]) {
        max = key;
      };
      if (model[min] > model[key]) {
        min = key
      };
    }
    const maxAbs = Math.abs(model[max]);
    const minAbs = Math.abs(model[min]);
    const amount = Math.min(maxAbs, minAbs);

    res.paymentChain.push({
      to: max,
      from: min,
      amount
    });
    model[max] -= amount;
    model[min] += amount;
  }

  ctx.status = 200;
  ctx.body = res;
});

module.exports = router;
