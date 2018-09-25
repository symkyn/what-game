import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

import Button from '../Button/Button';
import './FilterForm.css'

class FilterForm extends Component {

    inputs = {
        players: {
            label: 'Number of Players',
            property: 'numPlayers',
            type: 'number'
        },
        playTime: {
            label: 'Apox. Play Time',
            property: 'playTime',
            type: 'number'
        }
    }

    state={
        numPlayers: 0,
        playTime: 30,
        options: [
            {value: 'symkyn', label: 'Symkyn'},
            {value: 'triplzero', label: 'triplzero'}
        ]
    }

    handleChange(e, name) {
        e.preventDefault();
        const value = e.target.value;

        this.setState({[name]: value});
    }

    render() {
        return(
            <div className="filter-form">
                    <form>
                    <label>{this.inputs.players.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.players.property)}
                                value={this.state.numPlayers}
                                type={this.inputs.players.type}
                    />
                    <label>{this.inputs.playTime.label}</label>
                    <input 
                                onChange={(e) => this.handleChange(e, this.inputs.playTime.property)}
                                value={this.state.playTime}
                                type={this.inputs.playTime.type}
                                step={30}
                        /> {" minutes"}
                        <br />
                    <label>{"BGG Users:"}</label>
                    <div classname="multi-select-filter">
                        <Select
                            closeMenuOnSelect={false}
                            components={makeAnimated()}
                            isMulti
                            options={this.state.options}
                        />
                    </div>    
                    <Button className='search-button'>Filter</Button>
                    </form>
                </div>
        )
    }
}

export default FilterForm;