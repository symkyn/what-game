import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import UserGroupCard from './UserGroupCard';

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
        const myGroups = this.state.groups.map((g, i) => {
            return (
                <Link className="no-link" to={`information-group/${g.id}`} key={`group-${i}`} >
                    <UserGroupCard key={`user-group-${i}`} g={g}/>
                </Link>
            )
        })
        return(
            <div>
                <h3>My Groups</h3>
                {myGroups}
            </div>
        )
    }
}

export default UserInfo;