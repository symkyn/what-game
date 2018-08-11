const AuthRouter = require('./auth.router');
const GamesRouter = require('./games.router');
const VoteRouter = require('./vote.router');

function routerHub(app) {
    app.use('/auth', AuthRouter);
    app.use('/games', GamesRouter);
    app.use('/vote', VoteRouter);
}

module.exports = routerHub;