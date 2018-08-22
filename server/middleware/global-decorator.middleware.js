const express = require('express');
// var redis   = require("redis");
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
// const RedisStore = require('connect-redis')(session);
// const client  = redis.createClient();
const pgSession = require('connect-pg-simple')(session);

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
        store: new pgSession({
            conString: process.env.DB_CONNECTION_STRING
        }),
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000
        },
    }));

    app.use(express.static(__dirname + '/../build'));
}

module.exports = globalDecorator;