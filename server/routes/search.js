const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.model");
const { requireUserAuth } = require("../utils");

/* Check for listing */
router.post("/", async (req, res) => {
    const { itemToSearch } = req.body;
    try {   
      const listings = await Listing.find({})
      console.log(listings)
      listings.filter(listing => {
        const { street, city, zipcode } = listing.location;
        if (
            street.toLowerCase().includes(itemToSearch) || 
            city.toLowerCase().includes(itemToSearch) ||
            zipcode.includes(itemToSearch)
        ) return true;
        console.log(listings)
      });
      res.status(201).json({
        listings,
      });
    } catch (e) {
      console.error(error);
      res.status(500).json({
        errors: ["Error occurred while searching for listings. Please try again!"],
      });
    }
});

module.exports = router;
