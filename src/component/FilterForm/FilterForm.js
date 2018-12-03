import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import axios from 'axios';

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
    constructor(props){
        super(props)
        
        this.state={
            numPlayers: 0,
            playTime: 30,
            users: [],
            options: []
        }
    }

    componentDidMount() {
        axios.get(`/groups/groupMembers/${this.props.groupID}`)
            .then(results => {
                let userOptions = results.data.map(u => {return {value: u.bggid, label: u.bggid}});
                this.setState({
                    options: userOptions
                })
            })
            .catch(err => console.warn(err))
    }


    handleChange(e, name) {
        e.preventDefault();
        const value = e.target.value;

        this.setState({[name]: value});
    }

    changeUsers(e) {
        console.log(e)
        this.setState({
            users:[].slice.call(e).map(o => {
                return o.value;
            })
        });
    }
    

    render() {
        return(
            <div className="filter-form">
                    <form onSubmit={(e) => this.props.submitFilter(e, this.state.numPlayers, this.state.playTime, this.state.users)}>
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
                    <div className="multi-select-filter">
                        <Select
                            closeMenuOnSelect={false}
                            components={makeAnimated()}
                            isMulti
                            options={this.state.options}
                            onChange={(e) => this.changeUsers(e)}
                        />
                    </div>    
                    { (this.state.numPlayers > 0 && this.state.users.length > 0) ?
                        <Button className='search-button'>Filter</Button>
                        : null
                    }
                    </form>
                </div>
        )
    }
}

export default FilterForm;