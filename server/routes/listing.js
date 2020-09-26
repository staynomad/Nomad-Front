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

        } catch (e) {

        }
    }
);

module.exports = router;
