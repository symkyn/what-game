import React from 'react';

const ImportList = (props) => {
    return(
        <div className='import-game-list-item'>
            {/* <h3>{props.game.name}</h3> */}
            <img src={props.game.thumbnail} alt={`${props.game.name}-thumbnail`} onClick={(e) => props.gameImport(e, props.game.id, props.game.plays)} />
        </div>
    )
}

export default ImportList;