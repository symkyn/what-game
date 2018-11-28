import React, { Component } from 'react';
import axios from 'axios';

class AddLocation extends Component {
    inputs = {
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
    
    constructor() {
        super()
        
        this.state = {
            types: [],
            type: "",
            address1: '',
            address2: '',
            city: '',
            usstate: '',
            zipcode: '',
            maxplayers: '',
            tablecount: '',
            drinkallowed: false,
            foodallowed: false,
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
        e.preventDefault();
        const value = e.target.value;

        this.setState({[name]: value});
        
    }


    render(){
        console.log(this.state.type);
        const options = this.state.types.map((type, i) => {
            return (<option key={`option-${i}`} value={type.id}>{type.display}</option>)
        })
        return(
            <div className="add=location-form">
                <form>
                    <label>Type of Venue </label>
                    <select onChange={(e) => this.handleChange(e, 'type')} value={this.state.type}>
                        <option value="" disabled>Select your option</option>
                        {options}
                    </select>
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
                                value={this.state.drinkallowed}
                                type={this.inputs.drinkallowed.type}
                        />
                        <label>{this.inputs.foodallowed.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.foodallowed.property)}
                                value={this.state.foodallowed}
                                type={this.inputs.foodallowed.type}
                        />
                        <label>{this.inputs.public.label}</label>
                        <input 
                                onChange={(e) => this.handleChange(e, this.inputs.public.property)}
                                value={this.state.public}
                                type={this.inputs.public.type}
                        />
                    </div>
                </form>
            </div>
        )
    }

}

export default AddLocation;