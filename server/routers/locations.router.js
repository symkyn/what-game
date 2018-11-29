const express = require('express');

const LocationsRouter = express.Router();

LocationsRouter.get('/types', (req, res, next) => {
    req.db.locationTypes()
        .then(results => res.status(200).send(results))
        .catch(err => res.status(500).send(err))  
})

LocationsRouter.get('/myPlaces', (req, res, next) => {
    req.db.myplaces(req.session.user.id)
        .then(result => res.status(200).send(result))
        .catch(err => {
            console.warn(err);
            next({message: 'internal server error'})
        })
})

LocationsRouter.post('/add', (req, res, next) => {
    const newLocation = req.body;
    newLocation.controller = req.session.user.id;
    newLocation.state = newLocation.usstate;
    req.db.Locations.insert(newLocation)
        .then(result => res.status(200).send(result))
        .catch(err => {
            console.warn(err);
            next({message: 'internal server error'})
        })
})

module.exports = LocationsRouter;