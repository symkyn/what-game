import React from 'react';

export default function LocationCard(props) {
    return (
        <div className='location-card-div'>
            <h4>{props.l.title}</h4>
        </div>
    )
}