import React, { Component } from 'react';
import axios from 'axios';

class AddLocation extends Component {
    constructor() {
        super()
        
        this.state = {
            types: [],
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

    render(){
        return(
            <div className="add=location-form">
                add location form
            </div>
        )
    }

}

export default AddLocation;