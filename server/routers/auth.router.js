const express = require('express');
const bcrypt = require('bcryptjs');

const AuthRouter = express.Router();

AuthRouter.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    req.db.user(username)
        .then( result => {
            let user = result[0];
            if (bcrypt.compareSync(password, user.password)) {
                delete user.password;
                req.session.user = user;
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
    if (req.session.user) {
        res.status(200).send(req.session.user)
      } else {
        res.status(403).send({message: 'user is not logged in'})
      }    
    
})

AuthRouter.get('/logout',(req, res) => {
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