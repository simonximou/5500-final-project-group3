const nodemailer = require("nodemailer");

const userEmail = "wangtingzhao1@gmail.com";
const code = "123411";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  secure: true,
  auth: {
    user: "daily.horoscope.official@gmail.com",
    pass: "fjxhvmfojorcnxrb",
  },
});

var mailOptions = {
  from: "daily.horoscope.official@gmail.com",
  to: userEmail,
  subject: "Daily Horoscope verification code",
  text: code,
};

transporter.sendMail(mailOptions, function (err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log("Email sent: " + info.response);
  }
});
