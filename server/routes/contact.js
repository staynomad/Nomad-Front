const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const { csrfProtection, asyncHandler } = require('../utils');

/* Send email using data from 'Contact Us' page */
router.post('/', csrfProtection, asyncHandler(async (req, res, next) => {

}));

module.exports = router;
