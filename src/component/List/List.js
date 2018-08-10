import React, { Component } from 'react';
import axios from 'axios';
import  Game  from '../Game/Game';
import './List.css';

class List extends Component {
    constructor(){
        super()

        this.state = {
            games: []
        }
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

    render(){
        console.log(this.state.games)
        const gamesList = this.state.games.map((game, i) => 
        {
            return(<Game 
                        game={game}
                        key={`game-${i}`} 
                    />)
        })
        return(
            <div className="game-description">
                {gamesList}
            </div>
        )
    }
}

export default List;