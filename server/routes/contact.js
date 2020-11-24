const express = require("express");
const router = express.Router();

const nodemailer = require('nodemailer');

router.post(
  '/',
  async (req,res) => {
    try {
      const { name, email, text } = req.body
      // Create nodemailer transport to send reservation confirmation emails
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'vhomesgroup@gmail.com',
          pass: 'yowguokryuzjmbhj'
        }
      })
      const userMailOptions = {
        from: `"${name}" <reservations@vhomesgroup.com>`,
        to: "vhomesgroup@gmail.com",
        subject: `New message from ${name}`,
        text: `From: ${email}

              ${text}`
      }
      transporter.sendMail(userMailOptions, (error, info) => {
        if (error) {
          console.log(error)
        }
        else {
          console.log(`Message sent to ${email}`)
        }
      })
      res.status(200).json({
          "message": `Email sent to ${email}`
      });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({
        "errors":
          ["Error sending email. Please try again!"]
      });
    }
  }
)

module.exports = router
