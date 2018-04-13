const express = require('express');
const db = require('../database/database');
const User = require('../database/User');

const router = express.Router();

router.get('/', getAllUsers);
router.post("/", createUser);
router.get('/:userId', getSingleUser);
router.patch('/:userId', addCalendarToUser);

let userCollection = db.getCollection('users');

function getAllUsers(request, response) {
    let nameQuery = request.query.name;

    let userObjects = [];
    if (typeof nameQuery !== 'undefined') {
        userObjects = userCollection.where(function (user) {
            return (user.name === nameQuery);
        });
    } else {
        userObjects = userCollection.find();
    }

    response.json(userObjects);
}

function getSingleUser(request, response) {
    let userId = request.params.userId;
    let userObject = userCollection.get(userId);
    response.json(userObject);
}

function createUser(request, response) {
    let newuser = new User(request.body.name);
    userCollection.insert(newuser);
    response.json(newuser);
}

function addCalendarToUser(request, response) {
    let userId = request.params.userId;
    let calendarId = request.body.calendar;

    let userObject = userCollection.get(userId);
    let calendar = db.getCollection('calendars').get(calendarId);
    userObject.addCalendar(calendar);

    response.json(userObject);
}


module.exports = router;
