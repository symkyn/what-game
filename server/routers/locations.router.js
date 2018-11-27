const express = require('express');

const LocationsRouter = express.Router();

LocationsRouter.get('/types', (req, res, next) => {
    req.db.locationTypes()
        .then(results => res.status(200).send(results))
        .catch(err => res.status(500).send(err))  
})

module.exports = LocationsRouter;