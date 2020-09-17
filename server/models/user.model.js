const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true}
});


const User = mongoose.model("user", UserSchema);
module.exports = User;
