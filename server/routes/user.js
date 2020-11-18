const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const { requireUserAuth } = require("../utils");

router.get(
  "/getEmail/:userId",
  async (req, res) => {
    try {
      const userFound = await User.findOne({ _id: req.params.userId })
      if (!userFound) {
        return res.status(400).json({
          error: "User not found. Please try again."
        })
      }
      res.status(200).json({
        email: userFound.email
      })
    }
    catch(error) {
      console.log(error);
      res.status(500).json({
        error: "Error getting user. Please try again."
      });
    }
  }
)

router.get ('/getUserInfo/:userId', async (req, res) => {
  try {
    const userFound = await User.findOne ({_id: req.params.userId});
    if (!userFound) {
      return res.status (400).json ({
        error: 'User not found. Please try again.',
      });
    }
    res.status (200).json ({
      name: userFound.name,
      email: userFound.email,
      password: userFound.password
    });
  } catch (error) {
    console.log (error);
    res.status (500).json ({
      error: 'Error getting user. Please try again.',
    });
  }
});

module.exports = router
