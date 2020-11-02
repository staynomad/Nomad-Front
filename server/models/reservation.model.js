const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    listing: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
    days: {
        type: Number,
        required: true,
    }
});

const Reservation = mongoose.model("reservation", ReservationSchema);
module.exports = Reservation;