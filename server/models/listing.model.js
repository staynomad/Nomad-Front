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
    default: null,
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
  ratings: {
    type: Number,
    default: null
  },
  email: {
    type: String,
    required: true,
  }
  // dates: {
  //   type: Mixed,
  //   required: true,
  // },
});

const Listing = mongoose.model("listing", ListingSchema);
module.exports = Listing;
