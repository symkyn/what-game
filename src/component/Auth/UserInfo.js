import React, { Component } from 'react';
import axios from 'axios';

class UserInfo extends Component {

    constructor() {
        super()

        this.state={
            groups: []
        }
    }

    componentWillMount() {
        axios.get('groups/getGroups')
            .then(results => {
                this.setState({
                    groups: results.data
                })
                console.log(this.state)
            })
            .catch(err => console.warn(err))
    }


    render() {
        return(
            <div>
                User Info
            </div>
        )
    }
}

export default UserInfo;