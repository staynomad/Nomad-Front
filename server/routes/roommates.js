/* Placeholder request for roommates, currently just obtaining names of users in database */
const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

router.get("/", async (req, res) => {
  try {
    const roommates = await User.find({}, "name");
    if (!roommates) {
      return res.status(404).json({
        errors: ["Seems that there are no roommate matches."],
      });
    }
    return res.status(201).json({ body: roommates });
  } catch (errors) {
    console.error(errors);
    return res.status(500).json({
      errors: ["Error obtaining potential roommate matches. Please try again!"],
    });
  }
});

module.exports = router;
