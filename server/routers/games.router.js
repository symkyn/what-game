const express = require('express');
const axios = require('axios');
const parseString = require('xml2js-parser').parseString;

const GamesRouter = express.Router();

//  for testing BGG api
//  axios.get(`https://www.boardgamegeek.com/xmlapi/boardgame/68448`)
//                     .then(response => parseString(response.data, function(err, result) {
//                         const nameLength = result['boardgames']['boardgame'][0]['name'].length;
//                         let name = '';
//                         for(let i = 0; i < nameLength; i++){
//                             if(result['boardgames']['boardgame'][0]['name'][i]['$']['primary']) {
//                                 name = result['boardgames']['boardgame'][0]['name'][i]['_'];
//                             }
//                         }
//                         console.log(name)
//                     }))
//                     .catch(err => console.warn(err))

GamesRouter.get('/games', (req, res) => {
    let games = [];
    req.query.search ?
    req.db.findgamebytitle(req.query.search)
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => console.warn(err))
    :
    req.query.users ?
    
    req.query.users.split(',').map(e => {
        req.db.filterSearch(req.query.num, req.query.time, e)
        .then(result => {
            games = games.concat(result)
            if (e == req.query.users.split(',')[req.query.users.split(',').length - 1]){
                res.status(200).send(games);
            }
        })
        .catch(err => console.warn(err))
    })
    :
    req.db.gameslist()
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
    const owner = req.params.owner;
    const plays = req.params.plays;
    console.log(owner);
    let bgguser = 5;
    let name = '';
    req.db.userid(owner)
        .then(result => {
            if (result[0].id) {
                bgguser = result[0].id;
            }
        })
        .catch(err => console.warn(err))
    req.db.gameexist(gameID)
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
                    }))
                    .catch(err => console.warn(err))
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
            res.status(200).send(result[0])
        }) 
        .catch(err => res.status(500).send(err))
})

module.exports = GamesRouter;