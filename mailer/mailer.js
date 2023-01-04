const nm = require('nodemailer')

const mailer = nm.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'connecttthem@gmail.com',
        pass: 'gpdfvtcxvwisspwn'
    }
});
const from = "connecttthem@gmail.coml"

module.exports.mailer = mailer
module.exports.composeEmailForSignup = (to, name = 'Applicant') => {
  return {
    from,
    to,
    subject: "Application Recieved",
    text: `Hi ${name},\nYour application to signup is being processed. You will be notified once we get done.\n Regards,`
  }
}

module.exports.composeEmailForGrant = (to, name = 'Applicant') => {
  return {
    from,
    to,
    subject: "Application For Grant Recieved",
    text: `Hi ${name},\nYour application to get a fee grant is being processed. You will be notified once we get done.\n Regards,`
  }
}

module.exports.composeEmailForInternship = (to, name = 'Applicant') => {
  return {
    from,
    to,
    subject: "Application For Internship Recieved",
    text: `Hi ${name},\nYour application to get an internship is being processed. You will be notified once we get done.\n Regards,`
  }
}

module.exports.composeEmailForSuccessSignup = (to, name = 'Applicant') => {
  console.log('email success signup', to, name)
  return {
    from,
    to,
    subject: "Application Accepted",
    html: `<p>Hi ${name},\nYour application has been successfully accepted by the admin. You can now login and apply for Internship or Grant. \nRegards \nconnectthem,`
  }
}


module.exports.composeEmailForUnSuccessSignup = (to, name = 'Applicant', msg) => {
  console.log('email unsuccess signup', to, name)
  return {
    from,
    to,
    subject: "Application Rejected",
    html: `<p>Hi ${name},\nYour application has been rejected by the admin. Kindly login again and make necessary changes to your profile. The message from admin is "${msg}".\n Regards \n connectthem,`
  }
}


module.exports.composeEmailForSuccessGrant = (to, name = 'Applicant') => {
  return {
    from,
    to,
    subject: "Application For Grant Accepted",
    html: `<p>Hi ${name},\nYour application for a fee grant has been accepted. You will shortly recieve further instructions.</p><p>Regards,</p>`
  }
}


module.exports.composeEmailForSuccessInternship = (to, name = 'Applicant') => {
  return {
    from,
    to,
    subject: "Application For Internship Accepted",
    html: `<p>Hi ${name},\nYour application for a internship has been forwarded to various companies. Interested companies will contact you shortly. You can visit this <a href="https://connecthem.tayyabashoukat.repl.co/boss/list/companies">link</a> to get further info about registered companies.</p><p>Regards,</p>`
  }
}

module.exports.send = (draft, callback = (err, info) => { console.log(err); console.log(info) }) => {
  console.log('senfin email')
  mailer.sendMail(draft, callback)
}
