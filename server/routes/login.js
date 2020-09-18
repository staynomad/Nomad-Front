const express = require('express');
const router = express.Router();

const User = require('../models/user.model');
const { asyncHandler, getUserToken, validatePassword } = require('../utils');

/* User Login */
router.post('/', asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ 'email': email });

    if (!user || !validatePassword(password, user.password)) {
        const err = new Error('The provided credentials were invalid.');
        err.name = 'Login Error';
        err.status = 400;
        return next(err);
    }

    const token = getUserToken(user);
    res.json({
        token,
    })
}));

module.exports = router;
