const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(global.config.SENDGRID);
const {
  inviteTemplate
} = require('../../constants/mail');

const createMassageFor = (mail, template, title) => ({
  to: mail,
  from: 'admin@cashcr.tech',
  subject: title,
  html: template,
})

module.exports = {
  sendInviteEmailTo(mail, url) {
    const template = inviteTemplate(url);
    const msg = createMassageFor(mail, template, 'Invite to Cash Crowd');
    sgMail.send(msg);
  }
}
