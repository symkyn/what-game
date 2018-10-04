const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
var PostgreSqlStore = require('connect-pg-simple')(session);

const addDb = require('./add-db.middleware');

function globalDecorator(app) {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(addDb);
    app.use(session({
        name: 'what-game',
        resave: false,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,
        store: new PostgreSqlStore({
            conString: process.env.DB_CONNECTION_STRING
        }),
    }));

    app.use(express.static(__dirname + '/../build'));
}

module.exports = globalDecorator;