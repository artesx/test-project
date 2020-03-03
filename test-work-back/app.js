const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
global.atob = require("atob");
require('dotenv').config();

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./config/mongo');
require('./config/passport');

const { userRouter, indexRouter, postRouter } = require('./routes');
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/', indexRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err)

    res.status(err.status || 500);
    res.json({ errors: { 'message': err.message } });
});

module.exports = app;
