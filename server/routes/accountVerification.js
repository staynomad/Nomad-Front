const { baseURL } = require('../config')

const express = require("express");
const router = express.Router();

const nodemailer = require('nodemailer');
const { requireUserAuth } = require("../utils");

router.post(
  '/sendVerificationEmail',
  requireUserAuth,
  async (req, res) => {
    try {
      const { email, userId } = req.body
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'vhomesgroup@gmail.com',
          pass: 'yowguokryuzjmbhj'
        }
      })
      const userMailOptions = {
        from: '"VHomes" <reservations@vhomesgroup.com>',
        to: email,
        subject: `VHomes host account email verification needed`,
        text:
          `Please click the following link to verify your account
           ${baseURL}/accountVerification/${email}`,
        html:
          `<p>
            Please click
            <a href="${baseURL}/accountVerification/${req.body.userId}">here</a>
            to verify your account
           </p>`
        }
        transporter.sendMail(userMailOptions, (error, info) => {
          if (error) {
            console.log(error)
          }
          else {
            console.log(`Account verification email sent to ${email}`)
          }
        })
        res.status(200).json({
            "message": `Verified ${req.user._id}`
        });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({
          "errors": ["Error verifying account. Please try again!"]
      });
    }
  }
)


module.exports = router;
