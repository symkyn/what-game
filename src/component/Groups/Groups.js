import React, { Component } from 'react';
import axios from 'axios';

import CreateGroup from './CreateGroup';
import JoinGroup from './JoinGroup';

class Groups extends Component {

    constructor(){
        super()

        this.state={
            groups: [],
            selectedOption: 'create'
        }

        this.handleChange = this.handleChange.bind(this);

    }

    componentWillMount() {
        axios.get('groups/getGroups')
            .then(results => {
                this.setState({
                    groups: results.data
                })
            })
            .catch(err => console.warn(err))
            console.log(this.state.groups);
    }

    render(){
        const myGroups = this.state.groups.map(g => g.name)

        return(
            <div className='groups'>
               {myGroups}
                <form>
                    <fieldset>
                        <legend>Select what you want to do</legend>
                        <div>
                            <input 
                                    type='radio' 
                                    id='create' 
                                    value='create' 
                                    checked={this.state.selectedOption === 'create'} 
                                    onChange={this.handleChange} />
                            <label for='create'>Create</label>    
                        </div>
                        <div>
                            <input 
                                    type='radio' 
                                    id='join' 
                                    value='join' 
                                    checked={this.state.selectedOption === 'join'}
                                    onChange={this.handleChange} />
                            <label for='join'>Join</label>    
                        </div>
                    </fieldset>
                </form>
                {this.state.selectedOption==='create' ?
                <CreateGroup />
                :
                <JoinGroup />
                }
            </div>
        )
    }

    handleChange(e) {
        this.setState({selectedOption: e.target.value});
    }

    
}

export default Groups;