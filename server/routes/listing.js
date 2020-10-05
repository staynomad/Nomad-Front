const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.model");
const { requireUserAuth } = require("../utils");
// const { check, validationResult } = require("express-validator");

/* Add a listing */
router.post("/", async (req, res) => {
  try {
    const {
      location,
      pictures,
      description,
      details,
      price,
      rules,
      ratings,
      available,
    } = req.body;

    const newListing = await new Listing({
      location,
      pictures,
      description,
      details,
      price,
      rules,
      ratings,
      available,
    }).save();

    // Need to talk about return values, validation, etc.
    res.status(201).json({
      newListing,
    });
  } catch (e) {
    console.error(error);
    res.status(500).json({
      errors: ["Error occurred while creating listing. Please try again!"],
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find({});
    if (!listings) {
      res.status(404).json({
        errors: ["There are currently no listings! Please try again later."],
      });
    }

    res.status(201).json({
      body: listings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: ["Error occurred while getting listings. Please try again!"],
    });
  }
});

module.exports = router;
