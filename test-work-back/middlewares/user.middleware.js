const { User } = require('../models');

const validUsernamePassword = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        let errors = {};
        if (!username) {
            errors = {
                ...errors,
                username: 'Username is required'
            }
        }

        if (!password) {
            errors = {
                ...errors,
                password: 'Password is required'
            }
        }

        return res.status(406).json({
            errors
        });
    }

    next();
};

const checkUserExist = async (req, res, next) => {
    const { username } = req.body;
    const user = await User.findOne({ username });
    
    if (user) {
        return res.status(406).json({
            errors: {
                message: 'A user with that username already exists'
            }
        });
    }

    next();
}

module.exports = {
    validUsernamePassword,
    checkUserExist
};