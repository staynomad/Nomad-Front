const bcrypt = require('bcryptjs');

const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

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
  asyncHandler,
  passGenService,
};
