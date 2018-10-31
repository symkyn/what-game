const express = require('express');
const bcrypt = require('bcryptjs');

const GroupsRouter = express.Router();

GroupsRouter.post('/newGroup', (req, res) => {
    let newGroup = {...req.body, adminuser: req.session.user.id};
    req.db.Groups.insert(newGroup)
        .then(result => {
            let join = {groupid: result[0].id, userid: req.session.user.id}
            req.db.GroupsUser.insert(join)
                .then(result => res.status(200).send(result))
                .catch(err => res.status(401).send(err))
            })
        .catch(err => console.warn(err))
})

GroupsRouter.get('/getGroups', (req, res) => {
    req.query.isAdmin ?
    req.db.groupsByAdmin(req.session.user.id)
        .then(results => res.status(200).send(results))
        .catch(err => console.warn(err))
    : req.db.userGroups(req.session.user.id)
        .then(results => res.status(200).send(results))
        .catch(err => console.warn(err))
})

GroupsRouter.get('/groupMembers/:groupid', (req, res) => {
    const {groupid} = req.params;
    req.db.usersInGroup(groupid)
        .then(results => res.status(200).send(results))
        .catch(err => console.warn(err))
})

GroupsRouter.get('/getAllGroups', (req, res) => {
    req.db.getAllGroups()
        .then(results => res.status(200).send(results))
        .catch(err => console.warn(err))
})

GroupsRouter.post('/join', (req, res) => {
    const groupid = req.body.groupid;
    const join = {groupid, userid: req.session.user.id}
    if(req.body.ispublic) {
        req.db.GroupsUser.insert(join)
            .then(result => res.status(200).send(result))
            .catch(res.status(409).send({message: 'already in this group'}))
    } else {
        req.db.getPassword(groupid)
            .then(result => {
                if(result[0].grouppassword === req.body.password) {
                    req.db.GroupsUser.insert(join)
                        .then(result => res.status(200).send(result))
                        .catch(res.status(409).send({message: 'already in this group'}))
                }  else {
                    res.status(401).send({message: 'Wrong Password'})
                }
            })
            .catch(err => console.warn(err))
    }
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