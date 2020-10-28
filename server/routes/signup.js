const express = require("express");
const User = require("../models/user.model");
const { getUserToken, passGenService } = require("../utils");
const { check, body, validationResult } = require('express-validator');

const router = express.Router();

// eslint-disable-next-line no-useless-escape

/* POST users listing. */
router.post("/",
[
  check('email', "the email address is not a valid email address").isEmail(),
  check('name', "Name should be atleast 3 characters").isLength({ min: 3}),
  body('check')
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    else {
      return true;
    }
  }),
  check('password')
  .isLength({ min: 8 }).withMessage('Password must be of at least 8 characters')
  .matches(/\d/).withMessage('Password must atleast contain a number')
  .matches(/[A-Z]/).withMessage('Password must at least contain an uppercase character')
  .matches(/[a-z]/).withMessage('Password must at least contain a lowercase character')
  .matches(/^[a-zA-Z0-9!@#$%^&*)(+=._-]+$/).withMessage('Password must at least contain one special character')
]
, async (req, res) => {
  try {
    // data validation
    // why 422 status code? - explanation here -
    // https://www.bennadel.com/blog/2434-http-status-codes-for-invalid-data-400-vs-422.htm
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      // map errors
      const errorMessages = errors.array().map((x) => x.msg);
      return res.status(422).json({ errors: errorMessages});
    }
    const { name, email, password, isHost } = req.body;
    const user = await User.findOne({ email });
    if(user) {
      return res.status(422).json({ errors: [`User already exists with email ${email}`]});
    }
    // encrypt the password
    const encrypted_password = await passGenService(password);
    // create a new user
    const newUser = await new User({
      name,
      email,
      password: encrypted_password,
      isHost
    }).save();
    // now send the token
    const token = getUserToken({ id : newUser._id });
    // we could send the 200 status code
    // but 201 indicates the resource is created
    res.status(201).json({
      token,
      userId: newUser._id,
    });
  }
  catch(error) {
    // explicit error catching
    console.error(error);
    res.status(500).json({
      "errors":
      ["Error signing up user. Please try again!"]
    });
  }
});

module.exports = router;
