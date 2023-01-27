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

const sendEmailEvent = async (user, squads) => {
    const mailData = {
        path: '/sendEmail/sendEmail.ejs',
        subject: 'Volunteer Approval',
        email: user.email,
    };
    const details = {
        name: `${user.name}`,
        volunteerName: `${squads.driver.name}`,
        volunteerTel: `${squads.driver.tel}`,
        volunteerRole: `${squads.driver.role}`,
        volunteer2Name: `${squads.driver.name}`,
        volunteer2Tel: `${squads.driver.tel}`,
        volunteer2Role: `${squads.driver.role}`,
        volunteer3Name: `${squads.driver.name}`,
        volunteer3Tel: `${squads.driver.tel}`,
        volunteer3Role: `${squads.driver.role}`,
    };
    await sendEmail(mailData, details);
};

module.exports = { sendEmail, sendEmailEvent };
