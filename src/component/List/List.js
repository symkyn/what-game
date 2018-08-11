import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import  Game  from '../Game/Game';
import './List.css';

class List extends Component {
    constructor(){
        super()

        this.state = {
            games: []
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.addPlay = this.addPlay.bind(this);
    }

    componentWillMount() {
        axios.get('http://localhost:4000/games/games')
          .then(results => {
            this.setState({
              games: results.data
            })
          })
          .catch(err => console.warn(err))
    }

    handleDelete(e, id){
        e.preventDefault;

        axios.delete(`http://localhost:4000/games/delete/${id}`)
            .then(this.componentWillMount)
            .catch(err => console.warn(err))
    }

    addPlay(e, plays, id) {
        e.preventDefault;
        const newPlays = {plays: plays + 1};
        axios.patch(`http://localhost:4000/games/addPlay/${id}`, newPlays)
            .then(this.componentWillMount)
            .catch(err => console.warn(err))
    }

    render(){
        const gamesList = this.state.games.map((game, i) => 
        {
            return(
                <Link className="no-link" to={`game/${game.id}`} key={`game-${i}`} >
                    <Game 
                            addPlay = {(e) => this.addPlay(e, game.plays, game.id)}
                            handleDelete={(e) => this.handleDelete(e, game.id)}
                            game={game}
                        />
                </Link>        
                        )
        })
        return(
            <div className="game-description">
                {gamesList}
            </div>
        )
    }
}

export default List;