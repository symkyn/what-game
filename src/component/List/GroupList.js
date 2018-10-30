import React, { Component } from 'react';

class GroupLists extends Component {
    constructor(props){
        super(props)

        this.state={
            groupGames: [],
        }
    }

    render(){
        return(
            <div>
                <h4>Group</h4>
                {this.props.match.params.groupid}
            </div>
        )
    }
}

export default GroupLists;