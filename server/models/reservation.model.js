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
});

const Reservation = mongoose.model("reservation", ReservationSchema);
module.exports = Reservation;
