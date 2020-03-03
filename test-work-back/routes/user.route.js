const express = require('express');
const router = express.Router();
const passport = require('passport');

const { userMiddleware: { validUsernamePassword, checkUserExist } } = require('../middlewares');
const { User } = require('../models');

router.post('/', validUsernamePassword, checkUserExist, (req, res) => {
    const { username, password } = req.body;

    const user = new User({ username });

    user.setPassword(password);

    const userData = user.toAuth();

    return user.save()
        .then(() => res.json({ user: userData }));
});

router.post('/login', validUsernamePassword, (req, res, next) => {
    return passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (info) {
            return res.json(info)
        }

        if (user) {
            const userData = user.toAuth();
            user.save()
                .then(() => res.json({ user: userData }))
        }
    })(req, res, next);
});

router.post('/logout', (req, res) => {
    const accessToken = req.headers.authorization;
    User.findOne({ 'tokens.accessToken': accessToken }, (err, user) => {
        if (!user) {
            return res.status(404).json({ errors: { 'message': 'not found' } })
        }
        const tokenIndex = user.tokens.findIndex(el => el.accessToken === accessToken);
        user.tokens.splice(tokenIndex, 1);
        user.save()
            .then(() => res.json({ status: 'success' }))
    });
});

router.put('/refresh', async (req, res) => {
    const refreshToken = req.body.refreshToken;
    const user = await User.findOne({ 'tokens.refreshToken': refreshToken });
    if (!user) {
        return res.status(401).json({ errors: { 'refreshToken': 'not found' } })
    }

    const tokenIndex = user.tokens.findIndex(el => el.refreshToken === refreshToken);
    user.tokens.splice(tokenIndex, 1);
    const userData = user.toAuth();
    await user.save();
    return res.json(userData);
});


module.exports = router;
