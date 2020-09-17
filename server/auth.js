const bearerToken = require('express-bearer-token');
const jwt = require('jsonwebtoken');

const { jwtConfig } = require('./config');
const User = require('./models/userModel');

const { secret, expiresIn } = jwtConfig;

const getUserToken = user => {
    const userData = {
        id: user.id,
    };

    const token = jwt.sign(
        { data: userData },
        secret,
        { expiresIn: parseInt(expiresIn, 10) }
    );
    return token;
};

const restoreUser = (req, res, next) => {
    const { token } = req;
    if (!token) {
        return next();
    }

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            err.status = 401;
            return next(err);
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

const requireUserAuth = [bearerToken(), restoreUser];

module.exports = { 
    getUserToken, 
    requireUserAuth,
    validatePassword,
};