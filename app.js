const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Load routes into variables
const index = require('./routes/index');
const users = require('./routes/users');
const calendars = require('./routes/calendars');
const events = require('./routes/events');


const app = express();

// Generic application setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure routes in Express webserver
app.use('/', index);
app.use('/users', users);
app.use('/calendars', calendars);
app.use('/events', events);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404);
    res.send('Not found');
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.stack);
    res.send(err.stack);
});

module.exports = app;
