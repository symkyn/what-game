import React, { Component } from 'react';
import axios from 'axios';

class Groups extends Component {

    constructor(){
        super()

        this.state={
            groups: [],
        }

        this.handleChange = this.handleChange.bind(this);

    }

    render(){
        return(
            <div className='groups'>
                Groups
            </div>
        )
    }

    handleChange(e, name) {
        e.preventDefault();
        const value = e.target.value;

        this.setState({[name]: value});
    }

    
}

export default Groups;