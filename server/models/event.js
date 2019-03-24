const async = require("async");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Comment = require(`${global.basepath}/models/schemas/comment`);
let Tags = require(`${global.basepath}/models/schemas/tag`);
let Action = require(`${global.basepath}/models/schemas/action`);

let eventSchema = new Schema({
  title: { type: String, required: false },
  description: { type: String, required: false, index: false, maxlength: 512 },
  picture: { type: String, required: false },
  admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
  invite_code : { type: String, required : false, default : null },
  createdAt: { type: Number },
  updatedAt : { type: Number },
  amount: { type: Number },

  participants: [{
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false
  }],
  tags : [ Tags ],
  actions : [ Action ],
 // thread: [ Comment ]
});


// let sample = {
//     title: "Event title!",
//     description: "Event description!",
//     picture: "http://ima.ge",
//     admins: ["User1Id", "User2Id"],
//     createdAt: 123,
//     updatedAt: 12345,
//     participants: ["User1", "User2", "User3", "User4"],
//     tags: [{  tag1: "123" }],
//     thread: [
//         {
//             text: "A comment!",
//             author: "User1Id",
//             attachments: [{
//                 filename: "A doc with Id.doc",
//                 url: "http://123123"
//             }]
//         }
//     ],
//     actions: [{
//         createdAt: "Timestamp",
//         author: "AuthorId",
//         type: 2, // ActionTypeId
//         data: {
//             amount: 1000,
//             currency: "USD",
//             description: "A payment to a friendly officer",
//             tag: "tagId",
//         }
//     }]
// }
