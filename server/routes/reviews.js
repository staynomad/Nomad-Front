const axios = require('axios')

const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

const Listing = require("../models/listing.model")
const { requireUserAuth } = require("../utils");

// Add rating to listing object
router.post(
  '/:listingId',
  requireUserAuth,
  async(req, res) => {
    try {
      // Rating is an integer ranging from 1-5
      // Review is the message posted by the user
      const { rating, review } = req.body
      const { listingId } = req.params.listingId
      const userIdAsObjectId = mongoose.Types.objectId(req.user._id)
      const ratingData = {
        userIdAsObjectId: {
          stars: parseInt(rating),
          review: review
        }
      }
      // TODO: Add some sort of check here to see if user has already submitted review for specific listing
      const listing = await Listing.findOneAndUpdate({ _id: listingId }, { $set: { rating: ratingData } }, { new: true })
      if (!listing) {
        return res.status(400).json({
            "errors": "Listing does not exist. Please try again."
        })
      }
      res.status(200).json({
          "message": "Review submitted successfully."
      });
    }
    catch {
      console.log(error);
      res.status(500).json({
          "errors": ["Error submitting review. Please try again!"]
      });
    }
  }
)

module.exports = router;
