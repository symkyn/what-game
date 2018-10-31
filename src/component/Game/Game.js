import React from 'react';
import './Game.css';

import Button from '../Button/Button';

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
                    { !props.groupid ? 
                    <div>
                        <Button className= 'game-button' onClick={props.addPlay}>Add Play</Button>
                        <Button className= 'game-button' onClick={props.handleDelete}>Delete</Button>
                    </div>
                    : null }
                </span>
            </div>
        )
}



export default Game;
