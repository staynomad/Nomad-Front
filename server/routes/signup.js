const express = require("express");

const User = require("../models/user.model");
const utils = require("../utils");
// this is the user model for saving to schema
// see this doc for more info
// https://mongoosejs.com/docs/tutorials/findoneandupdate.html

const router = express.Router();

/* POST users listing. */
router.post("/", async (req, res) => {
  const name = req.query.name;
  const email = req.query.email;
  var password = req.query.password;
  if (password === undefined || name === undefined || email === undefined) {
    res.status("200").json("invalid input");
  }
  // hash the password
  password = await utils.passGenService(password);
  // filtering based on email
  const filter = { email };
  const update = { $setOnInsert: { name, password } };

  let rawResult = await User.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
    rawResult: true,
  });

  // the following flag helps determine if the document was updated
  if (rawResult.lastErrorObject.updatedExisting) {
    res.status(200).json({
      error: "user already exists",
    });
  } else {
    res.status(200).json({
      message: "user signed up",
    });
  }
});

module.exports = router;
