const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const { getUserToken, validatePassword } = require("../utils");
const { check, validationResult } = require("express-validator");

/* User Login */
router.post(
  "/",
  [check("email", "the email address is not a valid email address").isEmail()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // map errors
        const errorMessages = errors.array().map((x) => x.msg);
        return res.status(422).json({ errors: errorMessages });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      // explicit error handling for both user and password
      // 404 - status code if the user does not exist
      // 401 - status code if the passwords do not match
      // 200 - if everything is ok
      if (!user) {
        return res.status(404).json({
          errors: ["the user with this email address does not exist"],
        });
      }
      if (!validatePassword(password, user.password)) {
        return res.status(401).json({
          errors: ["the passwords do not match"],
        });
      }
      const token = getUserToken(user);
      return res.status(200).json({
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        errors: ["Error logging up user. Please try again!"],
      });
    }
  }
);

module.exports = router;
