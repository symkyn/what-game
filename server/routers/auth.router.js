const express = require('express');

const AuthRouter = express.Router();

AuthRouter.post('/login', (req, res) => {
    const user = req.body.username;
    req.db.user(user)
        .then( result => {
            req.session.user = {
                userid: result[0].id,
                firstname: result[0].firstname
            }
            console.log(req.session.user)
            res.status(200).send(result[0])
        })
        .catch(err => {
            console.warn(err); 
            next({message: 'internal server error' })
        })
});

AuthRouter.post('/register', (req, res) => {
    const newUser = req.body;
    req.db.User.insert(newUser)
        .then(newUser => {
            req.db.User(newUser)
                .then( result => {
                    req.session.user = {
                        userid: result[0].id,
                        firstname: result[0].firstname
                    }
                    res.status(200).send(result)
                })
                .catch(err => {
                    console.warn(err); 
                    next({message: 'internal server error' })
                })
        })
        .catch(err => {
            console.warn(err); 
            next({message: 'internal server error' })
        })
    res.status(200).send(newUser);
})

AuthRouter.get('/me', (req, res, next) => {
    // console.log('hello')
    // console.log(req.session)
    // req.db.session(req.sessionID)
    //     .then(result => console.log(result))
    //     .catch(err => console.warn(err))
    // if(req.session.user){
    //     const sessionUser = req.session.user["userid"];
    //     console.log(sessionUser)
    //     res.status(200).send(sessionUser)
    // } else {
    //     res.status(400).send('not logged in')
    // }
})

module.exports = AuthRouter;