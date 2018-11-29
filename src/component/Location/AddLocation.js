import React, { Component } from 'react';
import axios from 'axios';

import Button from '../Button/Button';
import './AddLocation.css';

class AddLocation extends Component {
    inputs = {
        title: {
            label: 'Title',
            property: 'title',
            type: 'text'
        },
        address1: {
            label: 'Address (Line 1)',
            property: 'address1',
            type: 'text'
        },
        address2: {
            label: 'Address (Line 2)',
            property: 'address2',
            type: 'text'
        },
        city: {
            label: 'City',
            property: 'city',
            type: 'text'
        },
        usstate: {
            label: 'State',
            property: 'usstate',
            type: 'text'
        },
        zipcode: {
            label: 'Zip Code',
            property: 'zipcode',
            type: 'number'
        },
        maxplayers: {
            label: 'Max Player Count',
            property: 'maxplayers',
            type: 'number'
        },
        tablecount: {
            label: 'How many tables',
            property: 'tablecount',
            type: 'number'
        },
        drinkallowed: {
            label: 'Drinks Allowed?',
            property: 'drinkallowed',
            type: 'checkbox'
        },
        foodallowed: {
            label: 'Food Allowed?',
            property: 'foodallowed',
            type: 'checkbox'
        },
        public: {
            label: 'Public Venue?',
            property: 'public',
            type: 'checkbox'
        },
    }
    
    constructor(props) {
        super(props)
        
        this.state = {
            types: [],
            type: "",
            title: '',
            address1: '',
            address2: '',
            city: '',
            usstate: '',
            zipcode: '',
            maxplayers: '',
            tablecount: '',
            drinkallowed: false,
            foodallowed: true,
            public: false,
        }
    }

    componentWillMount() {
        axios.get('/locations/types')
            .then(results => 
                this.setState({
                    types: results.data
                })
            )
            .catch(err => console.warn(err))
    }

    handleChange(e, name) {
        
        const value = e.target.value;
        if(value !== 'checkbox') {
            this.setState({[name]: value});
        } else {
            this.setState({[name]: !this.state[name]})
        }
    }

    render(){
        console.log(this.state.foodallowed);
        const options = this.state.types.map((type, i) => {
            return (<option key={`option-${i}`} value={type.id
            }>{type.display}</option>)
        })
        return(
            <div className="add-location-form">
                <form onSubmit={(e => this.props.createNew(e, this.state))}>
                    <label>Type of Venue </label>
                    <select onChange={(e) => this.handleChange(e, 'type')} value={this.state.type}>
                        <option value="" disabled>Select your option</option>
                        {options}
                    </select>
                    <input 
                                onChange={(e) => this.handleChange(e, this.inputs.title.property)}
                                value={this.state.title}
                                type={this.inputs.title.type}
                                placeholder={this.inputs.title.label}
                        />
                    <div className='address'>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.address1.property)}
                                value={this.state.address1}
                                type={this.inputs.address1.type}
                                placeholder={this.inputs.address1.label}
                        />
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.address2.property)}
                                value={this.state.address2}
                                type={this.inputs.address2.type}
                                placeholder={this.inputs.address2.label}
                        />
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.city.property)}
                                value={this.state.city}
                                type={this.inputs.city.type}
                                placeholder={this.inputs.city.label}
                        />
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.usstate.property)}
                                value={this.state.usstate}
                                type={this.inputs.usstate.type}
                                placeholder={this.inputs.usstate.label}
                        />
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.zipcode.property)}
                                value={this.state.zipcode}
                                type={this.inputs.zipcode.type}
                                placeholder={this.inputs.zipcode.label}
                        />
                    </div>
                    <div className='place-info'>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.maxplayers.property)}
                                value={this.state.maxplayers}
                                type={this.inputs.maxplayers.type}
                                placeholder={this.inputs.maxplayers.label}
                        />
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.tablecount.property)}
                                value={this.state.tablecount}
                                type={this.inputs.tablecount.type}
                                placeholder={this.inputs.tablecount.label}
                        />
                        <label>{this.inputs.drinkallowed.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.drinkallowed.property)}
                                value='checkbox'
                                type={this.inputs.drinkallowed.type}
                                // checked={this.state.drinkallowed}
                        />
                        <label>{this.inputs.foodallowed.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.foodallowed.property)}
                                value='checkbox'
                                type={this.inputs.foodallowed.type}
                                checked={this.state.foodallowed}
                        />
                        <label>{this.inputs.public.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.public.property)}
                                value='checkbox'
                                type={this.inputs.public.type}
                                // checked={this.state.public}
                        />
                    </div>
                    <Button type='submit'>Create New</Button>
                </form>
            </div>
        )
    }

}

export default AddLocation;