const node = require('nodemailer');
const smtp = require('nodemailer-smtp-transport');
const ejs = require('ejs');

const transporter = node.createTransport(smtp({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'woliday.shenkar@gmail.com',
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
            throw new Error('transporter error: mail was not sent');
        } else {
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
        volunteer2Name: `${squad.driver.name}`,
        volunteer2Tel: `${squad.driver.tel}`,
        volunteer2Role: `${squad.driver.role}`,
        volunteer3Name: `${squad.driver.name}`,
        volunteer3Tel: `${squad.driver.tel}`,
        volunteer3Role: `${squad.driver.role}`,
    };
    await sendEmail(mailData, details);
};

module.exports = { sendEmail, sendEmailEvent };
