const AuthRouter = require('./auth.router');
const GamesRouter = require('./games.router');

function routerHub(app) {
    app.use('/auth', AuthRouter);
    app.use('/games', GamesRouter);
}

module.exports = routerHub;