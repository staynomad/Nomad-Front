const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be blank'],
    },
    email: {
        type: String,
        index: { unique: true },
        required: [true, 'Email cannot be blank'],
    },
    password: {
        type: String,
        required: true,
    },
    check: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
