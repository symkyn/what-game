const express = require('express');

const VoteRouter = express.Router();

VoteRouter.post('/addVote/:gameID', (req, res, next) => {
    const { gameID } = req.params;
    const vote = req.body.vote;
    let userid = req.session.user.id;
    const newVote = {gamesid: gameID, userid: userid, vote: vote}
    req.db.hasvoted(gameID, userid)
        .then(result => {
            if(result.length == 0) {
                req.db.Votes.insert(newVote)
                    .then(() => {
                        req.db.findaveragevote(gameID)
                            .then(result => {
                                req.db.updatevoteongame(result[0].Average_Vote, gameID)
                                    .then(() => res.status(200).send('vote updated successfully'))
                                    .catch(err => console.warn(err))
                            })
                            .catch(err => console.warn(err))
                        res.status(200).send('vote added successfully')
                    })
                    .catch(err => console.warn(err))
            } else {
                req.db.updatevote(vote, gameID, userid)
                    .then(() => {
                        req.db.findaveragevote(gameID)
                            .then(result => {
                                req.db.updatevoteongame(result[0].Average_Vote, gameID)
                                    .then(() => res.status(200).send('vote updated successfully'))
                                    .catch(err => console.warn(err))
                            })
                            .catch(err => console.warn(err))
                    })
                    .catch(err => console.warn(err))
            }
        }) 
        .catch(err => console.warn(err))
        })

VoteRouter.get('/getVotes/:gameID', (req, res, next) => {
    const { gameID} = req.params;
    req.query.groupID > 0 ?
    req.db.votebyuserandgroup(gameID, req.query.groupID)
        .then(result => res.status(200).send(result))
        .catch(err => console.warn(err))
    :
    req.db.votesbyuser(gameID)
        .then(result => res.status(200).send(result))
        .catch(err => console.warn(err))    
})

VoteRouter.get('/options', (req, res, next) => {
    req.db.voteoptions()
        .then(result => res.status(200).send(result))
        .catch(err => {
            console.warn('error with the db', err);
            next({message: 'internal server error'})
        })
})

module.exports = VoteRouter;