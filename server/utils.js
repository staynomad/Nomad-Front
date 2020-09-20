// import { compareSync, genSalt, hash  } from 'bcryptjs';
const bcrypt = require('bcryptjs');
const bearerToken = require('express-bearer-token');
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('./config');
const User = require('./models/user.model');

const { secret, expiresIn } = jwtConfig;

const getUserToken = user => {
  return jwt.sign( { data: { id : user.id }},
    secret,
    { expiresIn: parseInt(expiresIn, 10) }
  );
};

const validatePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword.toString());
}


const SALT_WORK_FACTOR = 10;
const passGenService = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) reject(err);
      // hash the password using our new salt
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) reject(err);
        // return the hashed password here
        resolve(hash);
      });
    });
  });
};

module.exports = {
  getUserToken,
  passGenService,
  validatePassword
};
