module.exports = {
    environment: process.env.NODE_ENV || "development",
    port: process.env.PORT || 8080,
    DATABASE_URI: process.env.DATABASE_URI,
    jwtConfig: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
};