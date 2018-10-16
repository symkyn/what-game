const express = require('express');
const bcrypt = require('bcryptjs');

const AuthRouter = express.Router();

AuthRouter.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    req.db.user(username)
        .then( result => {
            let user = result[0];
            req.session.user = user;
            if (bcrypt.compareSync(password, user.password)) {
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
                    delete user.password;
                    req.session.user = user
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

AuthRouter.get('/me', (req, res) => {
    console.log(req.session.user);
    if (req.session.user) {
        res.status(200).send(req.session.user)
      } else {
        res.status(401).send({message: 'user is not logged in'})
      }    
    
})

AuthRouter.post('/logout',(req, res) => {
    console.log('logout')
    if (req.session.user || req.cookies.user_sid) {
      res.clearCookie('user_sid');
      req.session.destroy();
      res.status(200).send('logged out');
    } else {
        req.session.destroy();
        res.status(200).send('logged out');
    }
  })

module.exports = AuthRouter;