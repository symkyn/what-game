import React, { Component } from 'react';
import axios from 'axios';

import Button from '../Button/Button';

class CreateGroup extends Component {
    inputs= {
        name: {
            label: 'Group Name',
            property: 'name',
            type: 'text'
        },
        locationCity: {
            label: 'City',
            property: 'locationCity',
            type: 'text'
        },
        locationState: {
            label: 'State',
            property: 'locationState',
            type: 'text'
        },
        isPublic: {
            label: 'Public?',
            property: 'isPublic',
            type: 'checkbox'
        },
        groupPassword: {
            label: 'Password',
            property: 'groupPassword',
            type: 'text'
        },
    }
    
    constructor(props){
        super(props)

        this.state={
            name: '',
            locationCity: '',
            locationState: '',
            isPublic: true,
            groupPassword: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.createGroup = this.createGroup.bind(this);
    }

    handleChange(e, name) {
        e.preventDefault();
        const value = e.target.value;

        this.setState({[name]: value});
    }

    handleCheckChange(e) {
        const value = e.target.checked;
        if (value === 'checked') {
            this.setState({isPublic: value})
        } else {
            this.setState({
                isPublic: value,
                groupPassword: ''
            })
        }
    }

    createGroup(e) {
        e.preventDefault();

        axios.post('groups/newGroup', this.state)
            .then(this.props.remount)
            .catch(err => console.log(err))
    }

    render(){
        return(
            <div className='create-group'>
                Create Group
                <form onSubmit={(e) => this.createGroup(e)}>
                    <div className='form-rom'>
                        <label>{this.inputs.name.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.name.property)}
                                value={this.state.name}
                                type={this.inputs.name.type} 
                            />
                        <label>{this.inputs.locationCity.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.locationCity.property)}
                                value={this.state.locationCity}
                                type={this.inputs.locationCity.type} 
                            />
                        <label>{this.inputs.locationState.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.locationState.property)}
                                value={this.state.locationState}
                                type={this.inputs.locationState.type} 
                            />
                    </div>
                    <div className='private-group'>
                        <label>{this.inputs.isPublic.label}</label>
                            <input 
                                    onChange={(e) => this.handleCheckChange(e)}
                                    value={this.state.isPublic}
                                    checked={this.state.isPublic === true}
                                    type={this.inputs.isPublic.type} 
                                />
                    {!this.state.isPublic ? 
                        (<span><label>{this.inputs.groupPassword.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.groupPassword.property)}
                                value={this.state.groupPassword}
                                type={this.inputs.groupPassword.type} 
                            /> </span>)
                        : null}    
                    </div>
                    <Button type='submit'>Create Group</Button>
                </form>
            </div>
        )
    }
}

export default CreateGroup;