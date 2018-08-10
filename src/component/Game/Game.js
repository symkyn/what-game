import React from 'react';
import './Game.css';

function Game(props) {
    return(
            <div className="game-summary">
                <h4 className='title'>{props.game.title}</h4>
                <span className="info-span">
                    Player Count: {props.game.minplayercount} - {props.game.maxplayercount}  || 
                    Play time: {props.game.minplaytime} - {props.game.maxplaytime}
                </span>
                <span className="button-span">
                    Plays: {props.game.plays} 
                    <button onClick={props.addPlay}>Add Play</button>
                    <button onClick={props.handleDelete}>delete</button>
                </span>
            </div>
        )
}



export default Game;
