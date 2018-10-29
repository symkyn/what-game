import React, { Component } from 'react';
import axios from 'axios';

import JoinGroupCard from './JoinGroupCard';

class JoinGroup extends Component {
    constructor(){
        super()

        this.state={
            groups: []
        }

        this.joinGroup = this.joinGroup.bind(this);
    }

    componentWillMount() {
        axios.get('groups/getAllGroups')
            .then(results => {
                this.setState({
                    groups: results.data
                })
            })
            .catch(err => console.warn(err))
    }

    joinGroup(e, id, password, ispublic) {
        e.preventDefault();
        const join = {groupid: id, password, ispublic}
        axios.post('groups/join', join)
            .then(result => console.log(result))
            .catch(err => console.warn(err))    
    }

    render(){
        const allGroups = this.state.groups.map((g, i) => {
            return(
                <JoinGroupCard 
                        key={`join-card-${i}`}
                        group = {g}
                        joinGroup={(e, id, password, ispublic) => this.joinGroup(e, id, password, ispublic)}
                    />
            )}
        )
        return(
            <div className='create-group'>
                Join Group
                <div className='join-group-grid'>
                    {allGroups}
                </div>
            </div>
        )
    }
}

export default JoinGroup;