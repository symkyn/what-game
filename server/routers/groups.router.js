const express = require('express');
const bcrypt = require('bcryptjs');

const GroupsRouter = express.Router();

GroupsRouter.post('/newGroup', (req, res) => {
    let newGroup = {...req.body, adminuser: req.session.user.id};
    req.db.Groups.insert(newGroup)
        .then(result => res.status(200).send(result))
        .catch(err => console.warn(err))
})

GroupsRouter.get('/getGroups', (req, res) => {
    req.db.groupsByAdmin(req.session.user.id)
        .then(results => res.status(200).send(results))
        .catch(err => console.warn(err))
})

GroupsRouter.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    req.db.Groups.destroy(+id)
        .then(product => res.status(200).send(product))
        .catch(err => {
            console.warn(err);
            next({message: 'internal server error'})
        })
})

module.exports = GroupsRouter;