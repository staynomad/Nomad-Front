const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const { asyncHandler } = require('../utils');
const { nodemailer_auth } = require('../config');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: nodemailer_auth.email,
        pass: nodemailer_auth.password,
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

/* Send email using data from 'Contact Us' page */
router.post('/', asyncHandler(async (req, res, next) => {
    const { email, message, subject } = req.body;

    let mailOptions = {
        to: nodemailer_auth.email,
        subject: `${subject}`,
        text: `Email: ${email} \nMessage:\n${message}`,
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return next(err)
        } else {
            res.json('Email sent.')
        }
    });
}));

module.exports = router;
