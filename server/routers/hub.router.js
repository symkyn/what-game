const AuthRouter = require('./auth.router');
const GamesRouter = require('./games.router');
const VoteRouter = require('./vote.router');
const GroupsRouter = require('./groups.router');
const LocationsRouter = require('./locations.router');

function routerHub(app) {
    app.use('/auth', AuthRouter);
    app.use('/locations', LocationsRouter);
    app.use('/games', GamesRouter);
    app.use('/vote', VoteRouter);
    app.use('/groups', GroupsRouter);
}

module.exports = routerHub;