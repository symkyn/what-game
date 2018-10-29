import React, { Component } from 'react';
import axios from 'axios';

class JoinGroup extends Component {
    constructor(){
        super()

        this.state={
            groupName=''
        }
    }

    render(){
        return(
            <div className='create-group'>
                Join Group
            </div>
        )
    }
}

export default JoinGroup;