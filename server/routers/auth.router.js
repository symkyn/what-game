const express = require('express');
const bcrypt = require('bcryptjs');

const AuthRouter = express.Router();

AuthRouter.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    req.db.user(username)
        .then( result => {
            let user = result[0];
            if (bcrypt.compareSync(password, user.password)) {
                req.session.user = {
                    userid: user.id,
                    firstname: user.firstname
                }
                delete user.password;
                res.status(200).send(user);
              } else {
                res.status(401).send({ error: 'Invalid Username or password' });
              }
        })
        .catch(err => {
            console.warn(err); 
            next({message: 'internal server error' })
        })
});

AuthRouter.post('/register', (req, res, next) => {
    const user = req.body;
    var pwd = bcrypt.hashSync(user.password, 5);
    user.password = pwd;
    req.db.User.insert(user)
        .then(user => {
                    req.session.user = {
                        userid: user.id,
                        firstname: user.firstname
                    }
                    delete user.password;
                    res.status(200).send(user)
                })
        .catch(err => {
            console.warn(err); 
            next({message: 'internal server error' })
        })
});

AuthRouter.get('/users', (req, res, next) => {
    req.db.bggUserNames()
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            console.warn(err);
            next({message: 'could not get users list'})
        })
});

AuthRouter.get('/me', (req, res, next) => {
    console.log('session info: ', req.session)
    req.db.session(req.session.id)
        .then(result => console.log('result from session db: ',result))
        .catch(err => console.warn(err))
    if(req.session.user){
        const sessionUser = req.session.user["userid"];
        console.log(sessionUser)
        res.status(200).send(sessionUser)
    } else {
        res.status(400).send('not logged in')
    }
})

module.exports = AuthRouter;