module.exports = {
    environment: process.env.NODE_ENV || "development",
    DATABASE_URI: process.env.DATABASE_URI,
    jwtConfig: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    baseURL: process.env.NODE_ENV === 'production' ? 'http://example.com' : 'http://localhost:8080'
};
