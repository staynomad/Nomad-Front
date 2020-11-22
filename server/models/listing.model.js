const mongoose = require("mongoose");
const User = require("./user.model");
const Schema = mongoose.Schema;

const { Array, Mixed, Number, String } = Schema.Types;

const ListingSchema = new Schema({
  title: {
    type: String,
    default: null,
  },
  location: {
    type: Mixed,
    index: { unique: true },
    required: true,
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
  available: {
    type: Mixed,
    required: false,
  },
  pictures: {
    type: Array,
    default: null,
  },
  userId: {
    type: String,
    ref: User,
    required: false,
  },

  booked: {
    type: Array,
    default: [null, null],
  },
  rating: {
    type: Number,
    default: null,
  },
  rules: {
    type: Array,
    default: null,
  },
});

const Listing = mongoose.model("listing", ListingSchema);
module.exports = Listing;
