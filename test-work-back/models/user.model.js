const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: String,
    salt: String,
    tokens: []
});


UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function (password) {
    const passwordHash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.passwordHash === passwordHash;
};

UserSchema.methods.generateJWT = function () {
    const date = Date.now();
    const expireDate = (date / 1000) + 3600;

    return jwt.sign({
        username: this.username,
        id: this._id,
        exp: expireDate
    }, process.env.JWT_SECRET_KEY);
};

UserSchema.methods.createTokens = function () {
    const currentTokens = this.tokens === undefined ? [] : this.tokens;
    const newTokens = {
        accessToken: this.generateJWT(),
        refreshToken: crypto.randomBytes(16).toString('hex'),
    };
    this.tokens = [
        ...currentTokens,
        newTokens
    ];
    return newTokens;
};

UserSchema.methods.toAuth = function () {

    const {accessToken, refreshToken} = this.createTokens();

    return {
        _id: this._id,
        username: this.username,
        accessToken,
        refreshToken
    };
};

module.exports = mongoose.model('User', UserSchema);