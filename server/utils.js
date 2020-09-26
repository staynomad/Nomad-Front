// import { compareSync, genSalt, hash  } from 'bcryptjs';
const bcrypt = require('bcryptjs');
const bearerToken = require('express-bearer-token');
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('./config');

const { secret, expiresIn } = jwtConfig;

const getUserToken = user => {
  return jwt.sign( { data: { id : user.id }},
    secret,
    { expiresIn: parseInt(expiresIn, 10) }
  );
};

const restoreUser = (req, res, next) => {
  const { token } = req;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      if (err) {
          const customErr = new Error('Failed to verify token: missing or invalid.');
          customErr.name = 'JWT Error';
          customErr.status = 401;
          return next(customErr);
      }

      const { id } = jwtPayload.data;

      try {
          req.user = await User.findById(id);
      } catch (e) {
          return next(e);
      }

      if (!req.user) {
          return res.set("WWW-Authenticate", "Bearer")
              .status(401)
              .end();
      }

      return next();
  });
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

const requireUserAuth = [bearerToken(), restoreUser];

module.exports = {
  getUserToken,
  passGenService,
  requireUserAuth,
  validatePassword
};
