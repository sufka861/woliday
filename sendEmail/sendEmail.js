require('dotenv').config();
const node = require('nodemailer');
const smtp = require('nodemailer-smtp-transport');
const ejs = require('ejs');


const sendEmail = async (dataMail, details) => {
    const transporter = node.createTransport(smtp({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: "woliday.shenkar@gmail.com",
            pass: process.env.PASS,
        },
    }));

    const data = await ejs.renderFile(process.cwd() + dataMail.path, details);
    const mainOptions = {
        from: "woliday.shenkar@gmail.com",
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
        volunteerImg: `${squad.driver.img}`,
        volunteer2Name: `${squad.volunteer.name}`,
        volunteer2Tel: `${squad.volunteer.tel}`,
        volunteer2Role: `${squad.volunteer.role}`,
        volunteerImg: `${squad.volunteer.img}`,
        volunteer3Name: `${squad.volunteer2.name}`,
        volunteer3Tel: `${squad.volunteer2.tel}`,
        volunteer3Role: `${squad.volunteer2.role}`,
        volunteerImg: `${squad.volunteer2.img}`,
    };
    await sendEmail(mailData, details);
};

module.exports = { sendEmail, sendEmailEvent };
