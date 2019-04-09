const nodeMailer = require('nodemailer');

module.exports = {
  async sendEmail(payload) {
    let transporter = await nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'change-to-email',
        pass: 'change-to-pass',
      }
    });
    mailOptions = {
      from: '"Name" <email>', // sender address
      to: payload.email, // list of receivers
    };
    const getEmailType = await EmailService.checkType(payload);
    mailOptions = Object.assign({}, mailOptions, getEmailType);
    return transporter.sendMail(mailOptions);
  },
  async checkType(payload) {
    let mailOptions;
    switch (payload.type) {
      case 'welcome-email':
        mailOptions = {
          subject: 'Welcome Email',
          text: 'Successful Registration', // plain text body
          html: '<b>Welcome to HNG Remote Jobs</b>' // html body
        }
        break;
      case 'new-opening':
        mailOptions = {
          subject: 'New Job Alert',
          text: 'New Job Opening', // plain text body
          html: '<b>A new job was posted</b>' // html body
        }
        break;
    }
    return mailOptions;
  }
}
