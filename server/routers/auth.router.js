const express = require('express');

const AuthRouter = express.Router();

AuthRouter.post('/login', (req, res) => {
    const user = req.body.username;
    req.db.User(user)
    .then( result => {
        req.session.user = {
            userid: result[0].id,
            username: req.body.username,
            password: req.body.password,
        }
        res.status(200).send(result)
    })
    .catch(err => {
        console.warn(err); 
        next({message: 'internal server error' })
    })
});

AuthRouter.post('/register', (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    res.status(200).send(newUser);
})

module.exports = AuthRouter;