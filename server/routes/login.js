const express = require('express');
const router = express.Router();

const User = require('../models/userModel');
const { getUserToken, validatePassword } = require('../auth');
const { csrfProtection, asyncHandler } = require('../utils');

/* User Login */
router.post('/', csrfProtection, asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ 'email': email });

    if (!user || !validatePassword(password, user.password)) {
        const err = new Error('The provided credentials were invalid.');
        err.name = 'Login Error';
        err.status = 401;
        return next(err);
    }

    const token = getUserToken(user);
    res.json({
        token,
    })
}));

module.exports = router;
