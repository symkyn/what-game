import React, { Component } from 'react';
import axios from 'axios';

import CreateGroup from './CreateGroup';
import JoinGroup from './JoinGroup';
import GroupDetail from './GroupDetail';

class Groups extends Component {

    constructor(){
        super()

        this.state={
            groups: [],
            selectedOption: 'create'
        }

        this.deleteGroup = this.deleteGroup.bind(this);

    }

    componentWillMount() {
        axios.get('groups/getGroups')
            .then(results => {
                this.setState({
                    groups: results.data
                })
            })
            .catch(err => console.warn(err))
    }

    deleteGroup(e, id) {
        e.preventDefault();

        axios.delete(`groups/delete/${id}`)
            .then(this.componentWillMount())
            .catch(err => console.warn(err))
    }

    render(){
        const myGroups = this.state.groups.map((g, i) => {
            return(
                <GroupDetail key={`group-${i}`} name={g.name} deleteGroup={(e) => this.deleteGroup(e, g.id)} />)
            })

        return(
            <div className='groups'>
               {this.state.groups.length ? (
               <div className='my-groups'>
                    <h3>My Groups</h3>
                    {myGroups}
                </div>) : null}
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
                <CreateGroup remount={this.componentWillMount()} />
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