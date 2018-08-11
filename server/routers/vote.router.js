const express = require('express');

const VoteRouter = express.Router();

VoteRouter.post('/addVote/:gameID', (req, res, next) => {
    const { gameID } = req.params;
    const vote = req.body.vote;
    console.log(gameID);
    console.log(req.session);
    console.log(vote);
})

module.exports = VoteRouter;