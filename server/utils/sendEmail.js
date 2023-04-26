const nodemailer = require("nodemailer");

module.exports = async () => {
    try {
        const transporter = nodermailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT), 
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });
        await transporter.sendMail({
            from: process.env.USER, 
            to: email, 
            subject: subject,
            text: text
        });

        console.log("Email send successfully!");
    } catch (error) {
        console.log("Email send error!");
        console.log(error);
    }
};