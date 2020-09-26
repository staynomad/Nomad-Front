const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    // name: {
    //     type: String,
    //     required: [true, 'Name cannot be blank'],
    // },
    
});

const Listing = mongoose.model("listing", UserSchema);
module.exports = Listing;

