const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { Array, Mixed, Number, String } = Schema.Types;

const ListingSchema = new Schema({
  location: {
    type: Mixed,
    index: { unique: true },
    required: true,
  },
  pictures: {
    type: Array,
    default: [],
  },
  description: {
    type: String,
    required: true,
  },
  details: {
    type: Mixed,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rules: {
    type: String,
    default: "be nice",
  },
  ratings: {
    type: Number,
  },
  dates: {
    type: Mixed,
    required: true,
  },
});

const Listing = mongoose.model("listing", ListingSchema);
module.exports = Listing;
