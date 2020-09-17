const bcrypt = require("bcrypt");
const csrf = require('csurf');
const SALT_WORK_FACTOR = 10;
const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

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

const csrfProtection = csrf({ cookie: true });

module.exports = {
  asyncHandler,
  passGenService,
  csrfProtection,
};


