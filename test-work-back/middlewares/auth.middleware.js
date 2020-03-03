const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;

    if (authorization) {
        return authorization;
    }
    return null;
};

const authMiddleware = {
    required: jwt({
        secret: process.env.JWT_SECRET_KEY,
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
    }),
    optional: jwt({
        secret: process.env.JWT_SECRET_KEY,
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
    })
};

module.exports = authMiddleware;
