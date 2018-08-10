const express = require('express');

const AuthRouter = express.Router();

AuthRouter.post('/login', (req, res) => {
    const user = req.body.username;
    req.db.user(user)
        .then( result => {
            req.session.user = {
                userid: result[0].id,
                bggname: result[0].bggname,
                firstname: result[0].firstname,
                lastname: result[0].lastname,
                currentuser: req.body.username,
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
                        bggname: result[0].bggname,
                        firstname: result[0].firstname,
                        lastname: result[0].lastname,
                        currentuser: req.body.username,
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

module.exports = AuthRouter;