const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var PostgreSqlStore = require('connect-pg-simple')(session);

const addDb = require('./add-db.middleware');

const corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200
  }

function globalDecorator(app) {
    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(addDb);
    app.use(express.static(__dirname + '/../build'));
    app.use(cookieParser);
    app.use(session({
        store: new PostgreSqlStore({
            conString: process.env.DB_CONNECTION_STRING
        }),
        key: 'user_sid',
        resave: false,
        saveUninitialized: true,
        rolling: true,
        secret: process.env.SESSION_SECRET,
        cookie: {
            maxAge: 30 * 24 * 60 * 1000,
            //domain: 'localhost', //based on the domain of the website.
            httpOnly: true,
            sameSite: true,
        },
        name: 'what-game',
    }));
}

module.exports = globalDecorator;