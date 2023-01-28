const node = require('nodemailer');
const smtp = require('nodemailer-smtp-transport');
const ejs = require('ejs');

const transporter = node.createTransport(smtp({
    port: 465,
    host: 'smtp.zoho.com',
    secure: true,
    auth: {
        user: process.env.emailShenkar,
        pass: process.env.email,
    },
}));

const sendEmail = async (dataMail, details) => {
    const data = await ejs.renderFile(process.cwd() + dataMail.path, details);
    const mainOptions = {
        from: process.env.emailShenkar,
        to: dataMail.email,
        subject: dataMail.subject,
        html: data,
    };
    await transporter.sendMail(mainOptions, (err) => {
        if (err) {
            console.log(err + 'transporter error: mail was not sent');
        }else {
            console.log('mail was sent')
        }
    });
};

const sendEmailEvent = async (user, squad) => {
    const mailData = {
        path: '/sendEmail/sendEmail.ejs',
        subject: 'Volunteer Approval',
        email: user.email,
    };
    const details = {
        name: `${user.name}`,
        volunteerName: `${squad.driver.name}`,
        volunteerTel: `${squad.driver.tel}`,
        volunteerRole: `${squad.driver.role}`,
        volunteer2Name: `${squad.volunteer.name}`,
        volunteer2Tel: `${squad.volunteer.tel}`,
        volunteer2Role: `${squad.volunteer.role}`,
        volunteer3Name: `${squad.volunteer2.name}`,
        volunteer3Tel: `${squad.volunteer2.tel}`,
        volunteer3Role: `${squad.volunteer2.role}`,
    };
    await sendEmail(mailData, details);
};

module.exports = { sendEmail, sendEmailEvent };
