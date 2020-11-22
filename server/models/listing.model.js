const mongoose = require("mongoose");
const User = require("./user.model");
const Schema = mongoose.Schema;

const { Array, Mixed, Number, ObjectId, String } = Schema.Types;

const ListingSchema = new Schema({
  location: {
    type: Mixed,
    index: { unique: true },
    required: true,
  },
  pictures: {
    type: Array
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
    type: Array,
    default: null,
  },
  rating: {
    type: Object,
    default: null
  },
  userId: {
    type: ObjectId,
    ref: User,
    required: true,
  },
  available: {
    type: Array,
    required: true,
  },
  booked: {
    type: Array
  }
});

const Listing = mongoose.model("listing", ListingSchema);
module.exports = Listing;
