const express = require('express');
const Request = require('request');
const db = require('../database/database');
const Calendar = require('../database/Calendar');

const router = express.Router();

router.get('/', getAllCalendars);
router.post("/", createCalendar);
router.get('/:calendarId', getSingleCalendar);

let calendarCollection = db.getCollection('calendars');

function getAllCalendars(request, response) {
    let calendars = calendarCollection.find();
    response.json(calendars);
}

function getSingleCalendar(request, response) {
    let calendarId = request.params.calendarId;
    let calendar = calendarCollection.get(calendarId);
    response.json(calendar);
}

function createCalendar(request, response) {
    let userCollection = db.getCollection('users');
    let user = userCollection.get(request.body.owner);

    let newCalendar = new Calendar(request.body.name, user);
    calendarCollection.insert(newCalendar);

    // wir ignorieren die Antwort & mögliche Fehler
    Request.patch({
        url: 'http://localhost:3000/users/' + user.$loki,
        json: { calendar: newCalendar.$loki }
    });

    response.json(newCalendar);
}

module.exports = router;
