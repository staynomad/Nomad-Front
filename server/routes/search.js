const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.model");
const { requireUserAuth } = require("../utils");

/* Check for listing */
router.post("/", async (req, res) => {
    const { itemToSearch } = req.body;
    try {   
      let decodedItemToSearch = decodeURI(itemToSearch)
      const listings = await Listing.find({})
      const filteredListings = listings.filter(listing => {
        const { street, city, zipcode } = listing.location;
        if (
            street.toLowerCase().includes(decodedItemToSearch) || 
            city.toLowerCase().includes(decodedItemToSearch) ||
            zipcode.includes(decodedItemToSearch)
        ) return true;
      });
      
      if (filteredListings.length === 0) {
        return res.status(404).json({
          errors: ["There were no listings found with the given search term."],
        });
      }

      res.status(200).json({
        filteredListings,
      });
    } catch (e) {
      console.error(error);
      res.status(500).json({
        errors: ["Error occurred while searching for listings. Please try again!"],
      });
    }
});

module.exports = router;
