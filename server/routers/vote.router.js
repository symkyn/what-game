const express = require('express');

const VoteRouter = express.Router();

VoteRouter.post('/addVote/:gameID', (req, res, next) => {
    const { gameID } = req.params;
    const vote = req.body.vote;
    const bggid = req.body.username;
    let userid = null;
    let hasVoted = false;
    req.db.userinfo(bggid)
        .then(result => {
            userid = result[0].id
            const newVote = {gamesid: gameID, userid: userid, vote: vote}
            req.db.hasvoted(gameID, userid)
                .then(result => {
                    if(result.length == 0) {
                        req.db.Votes.insert(newVote)
                            .then(() => {
                                req.db.findaveragevote(gameID)
                                    .then(result => console.log(result[0].Average_Vote))
                                    .catch(err => console.warn(err))
                                res.status(200).send('vote added successfully')
                            })
                            .catch(err => console.warn(err))
                    } else {
                        req.db.updatevote(vote, gameID, userid)
                            .then(() => {
                                req.db.findaveragevote(gameID)
                                    .then(result => console.log(result[0].Average_Vote))
                                    .catch(err => console.warn(err))
                                res.status(200).send('vote updated successfully')
                            })
                            .catch(err => console.warn(err))
                    }
                }) 
                .catch(err => console.warn(err))
                })
        .catch(err => console.warn(err))
})

module.exports = VoteRouter;