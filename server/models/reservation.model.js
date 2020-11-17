const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { Array, Mixed, Number, ObjectId, String, Date } = Schema.Types;

const ReservationSchema = new Schema({
    user: {
        type: ObjectId,
        required: true,
    },
    listing: {
        type: ObjectId,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    days: {
        type: Array,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Reservation = mongoose.model("reservation", ReservationSchema);
module.exports = Reservation;
