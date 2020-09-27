const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.model");
const { requireUserAuth } = require("../utils");
// const { check, validationResult } = require("express-validator");

/* Add a listing */
router.post(
    "/",
    requireUserAuth,
    async (req, res) => {
        try {
            const { 
                location, 
                pictures, 
                description, 
                details, 
                price, 
                rules, 
                ratings, 
                available 
            } = req.body;

            const newListing = await new Listing({
                location, 
                pictures, 
                description, 
                details, 
                price, 
                rules, 
                ratings, 
                available 
            }).save();

            // Need to talk about return values, validation, etc.
            res.status(201).json({

            });
        } catch (e) {
            console.error(error);
            res.status(500).json({
              "errors":
              ["Error occurred while creating listing. Please try again!"]
            }); 
        }
    }
);

module.exports = router;
