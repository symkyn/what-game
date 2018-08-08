const express = require('express');
const axios = require('axios');
const parseString = require('xml2js-parser').parseString;

const GamesRouter = express.Router();

GamesRouter.get('/import/:bgguser', (req, res) => {
    const bgguser = req.params.bgguser;
    console.log(bgguser);
    axios.get(`https://www.boardgamegeek.com/xmlapi2/collection?username=${bgguser}&own=1`)
        .then(response => parseString(response.data, function(err, result) {
            let length = result['items']['$']['totalitems']
            let gamesArray = []
            for(var i = 0; i < length; i++) {

                gamesArray.push({
                    name: result['items']['item'][i]['name'][0]['_'], 
                    id: result['items']['item'][i]['$']['objectid'],
                    plays: result['items']['item'][i]['numplays']
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
    let bgguser = NaN;
    req.db.userid(owner)
        .then(result => {
            bgguser = result[0].id;
        })
        .catch(err => console.warn(err))
    axios.get(`https://www.boardgamegeek.com/xmlapi/boardgame/${gameID}`)
        .then(response => parseString(response.data, function(err, result) {
            const newGame = { 
                bggid: Number(gameID),
                owner: bgguser,
                title: result['boardgames']['boardgame'][0]['name'][0]['_'],
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
                .then(result => console.log(result))
                .catch(err => console.warn.err)
            res.status(200).send(newGame);
        }))
        .catch(err => console.warn(err))
})

module.exports = GamesRouter;