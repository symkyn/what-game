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
        locationcity: {
            label: 'City',
            property: 'locationcity',
            type: 'text'
        },
        locationstate: {
            label: 'State',
            property: 'locationstate',
            type: 'text'
        },
        ispublic: {
            label: 'Public?',
            property: 'ispublic',
            type: 'checkbox'
        },
        grouppassword: {
            label: 'Password',
            property: 'grouppassword',
            type: 'text'
        },
    }
    
    constructor(props){
        super(props)

        this.state={
            name: '',
            locationcity: '',
            locationstate: '',
            ispublic: true,
            grouppassword: '',
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
            this.setState({ispublic: value})
        } else {
            this.setState({
                ispublic: value,
                grouppassword: ''
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
                        <label>{this.inputs.locationcity.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.locationcity.property)}
                                value={this.state.locationcity}
                                type={this.inputs.locationcity.type} 
                            />
                        <label>{this.inputs.locationstate.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.locationstate.property)}
                                value={this.state.locationstate}
                                type={this.inputs.locationstate.type} 
                            />
                    </div>
                    <div className='private-group'>
                        <label>{this.inputs.ispublic.label}</label>
                            <input 
                                    onChange={(e) => this.handleCheckChange(e)}
                                    value={this.state.ispublic}
                                    checked={this.state.ispublic === true}
                                    type={this.inputs.ispublic.type} 
                                />
                    {!this.state.ispublic ? 
                        (<span><label>{this.inputs.grouppassword.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.grouppassword.property)}
                                value={this.state.grouppassword}
                                type={this.inputs.grouppassword.type} 
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