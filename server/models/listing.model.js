const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { Array, Mixed, Number, String } = Schema.Types;

const ListingSchema = new Schema({
    location: {
        type: String,
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
        type: Array,
        default: [],
    },
    ratings: {
        type: Number,
    },
    available: {
        type: Array,
        default: [],
    }
});

const Listing = mongoose.model("listing", ListingSchema);
module.exports = Listing;

