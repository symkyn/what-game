import React, { Component } from 'react';
import axios from 'axios';

class CreateGroup extends Component {
    constructor(){
        super()

        this.state={
            groupName=''
        }
    }

    render(){
        return(
            <div className='create-group'>
                Create Group
            </div>
        )
    }
}

export default CreateGroup;