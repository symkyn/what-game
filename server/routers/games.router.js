const express = require('express');
const axios = require('axios');
const parseString = require('xml2js-parser').parseString;

const GamesRouter = express.Router();

//  for testing BGG api
//  axios.get(`https://www.boardgamegeek.com/xmlapi2/collection?username=symkyn&own=1`)
//                     .then(response => parseString(response.data, function(err, result) {
//                         console.log(response.data) }))
//                     //     const nameLength = result['boardgames']['boardgame'][0]['name'].length;
//                     //     let name = '';
//                     //     for(let i = 0; i < nameLength; i++){
//                     //         if(result['boardgames']['boardgame'][0]['name'][i]['$']['primary']) {
//                     //             name = result['boardgames']['boardgame'][0]['name'][i]['_'];
//                     //         }
//                     //     }
//                     //     console.log(name)
//                     // }))
//                     .catch(err => console.warn(err))

GamesRouter.get('/myGames', (req, res) => {
    let games = [];
    req.query.search ?
    req.db.findgamebytitle(req.query.search, req.session.user.id)
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => console.warn(err))
    :
    req.db.gameslist(req.session.user.id)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => console.warn(err))
}) 

GamesRouter.get('/groupGames/:groupid', (req, res) => {
    let games = [];
    let { groupid } = req.params;
    req.query.search ?
    req.db.findgroupgamebytitle(req.query.search, groupid)
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => console.warn(err))
    :
    req.query.users ?
    
    req.query.users.split(',').map(e => {
        req.db.filterSearch(req.query.num, req.query.time, e, groupid)
        .then(result => {
            games = games.concat(result)
            if (e == req.query.users.split(',')[req.query.users.split(',').length - 1]){
                res.status(200).send(games);
            }
        })
        .catch(err => console.warn(err))
    })
    :
    req.db.groupgamelist(groupid)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => console.warn(err))
}) 

GamesRouter.get('/import/:bgguser', (req, res) => {
    const bgguser = req.params.bgguser;
    axios.get(`https://www.boardgamegeek.com/xmlapi2/collection?username=${bgguser}&own=1`)
        .then(response => parseString(response.data, function(err, result) {
            let length = result['items']['$']['totalitems']
            let gamesArray = []
            for(var i = 0; i < length; i++) {

                gamesArray.push({
                    name: result['items']['item'][i]['name'][0]['_'], 
                    id: result['items']['item'][i]['$']['objectid'],
                    plays: result['items']['item'][i]['numplays'],
                    thumbnail: result['items']['item'][i]['thumbnail']
                })
            }
            res.status(200).send(gamesArray);
            // console.log(gamesArray)
        }))
        .catch(err => console.warn(err))
})

GamesRouter.get('/importGame/:bggGameid/:owner/:plays', (req, res) => {
    const gameID = req.params.bggGameid;
    var bgguser = req.session.user.id;
    var plays = req.params.plays;
    let name = '';
    req.db.gameexist(gameID, bgguser)
        .then(result => {
            if (result.length == 0) {
                axios.get(`https://www.boardgamegeek.com/xmlapi/boardgame/${gameID}`)
                    .then(response => parseString(response.data, function(err, result) {
                        const nameLength = result['boardgames']['boardgame'][0]['name'].length;
                        for(let i = 0; i < nameLength; i++){
                            if(result['boardgames']['boardgame'][0]['name'][i]['$']['primary']) {
                                name = result['boardgames']['boardgame'][0]['name'][i]['_'];
                            }
                        }
                        if(result['boardgames']['boardgame'][0]['boardgameexpansion']){
                            if(result['boardgames']['boardgame'][0]['boardgameexpansion'][0]['$']['inbound']){
                            const newExpansion = { 
                                bggid: Number(gameID),
                                basegameid: Number(result['boardgames']['boardgame'][0]['boardgameexpansion'][0]['$']['objectid']),
                                owner: bgguser,
                                title: name,
                                minplayercount: Number(result['boardgames']['boardgame'][0]['minplayers'][0]),
                                maxplayercount: Number(result['boardgames']['boardgame'][0]['maxplayers'][0]),
                                minplaytime: Number(result['boardgames']['boardgame'][0]['minplaytime'][0]),
                                maxplaytime: Number(result['boardgames']['boardgame'][0]['maxplaytime'][0]),
                                thumbnail: result['boardgames']['boardgame'][0]['thumbnail'][0],
                                description: result['boardgames']['boardgame'][0]['description'][0],
                                genre: '',
                                plays: Number(plays)  
                            }
                            req.db.Expansion.insert(newExpansion)
                                .then(result => result)
                                .catch(err => console.warn(err))
                            res.status(200).send(newExpansion);
                            } else {
                                const newGame = { 
                                    bggid: Number(gameID),
                                    owner: bgguser,
                                    title: name,
                                    minplayercount: Number(result['boardgames']['boardgame'][0]['minplayers'][0]),
                                    maxplayercount: Number(result['boardgames']['boardgame'][0]['maxplayers'][0]),
                                    minplaytime: Number(result['boardgames']['boardgame'][0]['minplaytime'][0]),
                                    maxplaytime: Number(result['boardgames']['boardgame'][0]['maxplaytime'][0]),
                                    thumbnail: result['boardgames']['boardgame'][0]['thumbnail'][0],
                                    description: result['boardgames']['boardgame'][0]['description'][0],
                                    genre: '',
                                    plays: Number(plays),
                                    averagevote: NaN    
                                }
                                req.db.Games.insert(newGame)
                                    .then(result => result)
                                    .catch(err => console.warn(err))
                                res.status(200).send(newGame);
                            }
                        } else {
                        const newGame = { 
                            bggid: Number(gameID),
                            owner: bgguser,
                            title: name,
                            minplayercount: Number(result['boardgames']['boardgame'][0]['minplayers'][0]),
                            maxplayercount: Number(result['boardgames']['boardgame'][0]['maxplayers'][0]),
                            minplaytime: Number(result['boardgames']['boardgame'][0]['minplaytime'][0]),
                            maxplaytime: Number(result['boardgames']['boardgame'][0]['maxplaytime'][0]),
                            thumbnail: result['boardgames']['boardgame'][0]['thumbnail'][0],
                            description: result['boardgames']['boardgame'][0]['description'][0],
                            genre: '',
                            plays: Number(plays),
                            averagevote: NaN    
                        }
                        req.db.Games.insert(newGame)
                            .then(result => result)
                            .catch(err => console.warn(err))
                        res.status(200).send(newGame);
                    }}))
                    .catch(err => console.warn(err))
            } else {
                res.status(409).send({message: 'You have already imported this game!'})
            }       
        })
        .catch(err => console.warn(err))
})

GamesRouter.delete('/delete/:id', (req, res, next) => {
    const { id } = req.params;
    req.db.Games.destroy(+id)
        .then(product => res.status(200).send(product))
        .catch(err => {
            console.warn(err);
            next({message: 'internal server error'})
        })
})

GamesRouter.patch('/addPlay/:id', (req, res, next) => {
    const { id } = req.params;
    const { plays } = req.body;
    req.db.Games
        .update(+id, { plays })
        .then(product => res.status(202).send(product))
        .catch(err => {
            console.warn('error with the db', err);
            next({message: 'internal server error'})
        })
})

GamesRouter.post('/newGame', (req,res,next) => {
    let newGame = req.body;
    req.db.userid(newGame.owner)
        .then(result => {
            newGame.owner = result[0].id;
            req.db.Games.insert(newGame)
                .then(() => res.status(200).send(newGame))
                .catch(err => res.status(500).send(err))
        })
        .catch(err => console.warn(err))
})

GamesRouter.get('/gameDetails/:gameID', (req,res,next) => {
    const { gameID } = req.params;
    req.db.gamedetail(gameID)
        .then( result => {
            res.status(200).send(result)
        }) 
        .catch(err => res.status(500).send(err))
})

module.exports = GamesRouter;