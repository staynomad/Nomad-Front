const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.model");
const { requireUserAuth } = require("../utils");
// const { check, validationResult } = require("express-validator");

/* Add a listing */
router.post("/createListing", requireUserAuth, async (req, res) => {
  try {
    const {
      location,
      pictures,
      description,
      details,
      price,
      rules,
      ratings,
      dates,
    } = req.body;

    const newListing = await new Listing({
      location,
      pictures,
      description,
      details,
      price,
      rules,
      ratings,
      dates,
    }).save();

    // Need to talk about return values, validation, etc.
    res.status(201).json({
      newListing,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: ["Error occurred while creating listing. Please try again!"],
    });
  }
});

/* Update a listing */
router.put("/editListing/:listingId", requireUserAuth, async (req, res) => {
  try {
    const listing = await Listing.findOne({
      _id: req.params.listingId,
      email: req.user.email,
    });

    if (!listing) {
      res.status(500).json({
        errors: ["Listing was not found. Please try again!"],
      });
    } else {
      const updatedKeys = Object.keys(req.body);
      updatedKeys.forEach(async (key) => {
        if (key && key !== null) {
          console.log('changing ' + key)
          listing[key] = req.body[key];
        };
      });
      await listing.save();
      res.status(200).json({
        listing,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: ["Error occurred while creating listing. Please try again!"],
    });
  }
});

/* Get all listings */
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find({});
    if (!listings) {
      res.status(404).json({
        errors: ["There are currently no listings! Please try again later."],
      });
    } else {
      res.status(201).json({
        listings,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: ["Error occurred while getting listings. Please try again!"],
    });
  }
});

/* Get all listings by filter */
router.post ('/filteredListings', async (req, res) => {
  const {minRatingClicked, startingPriceClicked, minGuestsClicked} = req.body;
  try {
    var listings;
    var filterClicked = minRatingClicked || startingPriceClicked // or minGuestsClicked
    if (filterClicked) {
      listings = await Listing.find({
        'rating.user': {$gte: req.body.minRating},
        price: {$gte: req.body.startingPrice}
      });
    } else if (minGuestsClicked) { // ideally want to get rid of this part
      listings = await Listing.find({
        'rating.user': {$gte: req.body.minRating},
        price: {$gte: req.body.startingPrice},
        'details.maxpeople': {$gte: req.body.minGuests} // doesn't work since this field is a String
      })
    } else {
      console.log("no listings have been specified")
      listings = await Listing.find ({});
    }
    if (!listings) {
      res.status (404).json ({
        errors: ['There are currently no listings! Please try again later.'],
      });
    } else {
      res.status (201).json ({
        listings,
      });
    }
  } catch (error) {
    console.error (error);
    res.status (500).json ({
      errors: ['Error occurred while getting listings. Please try again!'],
    });
  }
});

/* Get all listings belonging to user */
router.get("/byUserId", requireUserAuth, async (req, res) => {
  try {
    const userListings = await Listing.find({ userId: req.user._id });
    if (!userListings) {
      res.status(404).json({
        errors: ["There are currently no listings! Please try again later."],
      });
    } else {
      res.status(200).json({
        userListings,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: ["Error occurred while getting listings. Please try again!"],
    });
  }
});

/* Get listing by listingID (MongoDB Object ID) */
router.get("/byId/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      res.status(404).json({
        errors: ["Listing does not exist."],
      });
    } else {
      res.status(200).json({
        listing,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: ["Error occurred while getting listings. Please try again!"],
    });
  }
});

/* Get listing by search term */
router.post("/search", async (req, res) => {
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
    } else {
      res.status(200).json({
        filteredListings,
      });
    }
  } catch (e) {
    console.error(error);
    res.status(500).json({
      errors: ["Error occurred while searching for listings. Please try again!"],
    });
  }
});

/* Delete listing by id */
router.delete("/remove/:listingId", requireUserAuth, async (req, res) => {
  try {
    const listing = await Listing.findOne({
      _id: req.params.listingId,
      userId: req.user._id,
    });

    if (!listing) {
      res.status(500).json({
        errors: ["Listing was not found. Please try again!"],
      });
    } else {
      listing.remove()
      res.status(200).json({
        message: ["Listing was removed."],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: ["Error occurred while attempting to remove listing. Please try again!"],
    });
  }
});

module.exports = router;
