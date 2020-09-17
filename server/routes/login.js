const express = require('express');
const router = express.Router();

const User = require("../models/userModel");
const { getUserToken, validatePassword } = require("../auth");
const { csrfProtection, asyncHandler } = require('../utils');

/* User Login */
router.post('/', csrfProtection, asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ 'email': email });

    if (!user || !validatePassword(password, user.hashedPassword)) {
        const err = new Error("Failed to log in.");
        err.errors = ["The provided credentials were invalid"];
        err.status = 401;
        err.title = "Login failed.";
        return next(err);
    }

    const token = getUserToken(user);
    res.json({
        token,
    })
}));

module.exports = router;
