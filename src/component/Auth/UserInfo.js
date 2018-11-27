import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';

import Button from './../Button/Button';
import UserGroupCard from './UserGroupCard';
import AddLocation from '../Location/AddLocation';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class UserInfo extends Component {

    constructor() {
        super()

        this.state={
            groups: [],
            addLocation: false,
        }

        this.addLocation = this.addLocation.bind(this);
        this.closeAddLocation = this.closeAddLocation.bind(this);
    }

    componentWillMount() {
        Modal.setAppElement('body');
        axios.get('groups/getGroups')
            .then(results => {
                this.setState({
                    groups: results.data
                })
            })
            .catch(err => console.warn(err))
    }

    addLocation(e) {
        e.preventDefault();

        this.setState({
            addLocation: true,
        })
    }

    closeAddLocation() {
        this.setState({
            addLocation: false,
        })
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
                { !this.state.addLocation ?
                    <Button onClick={(e) => this.addLocation(e)}>Add Location</Button>
                    : null
                }
                <Modal
                    isOpen={this.state.addLocation}
                    onRequestClose={this.closeAddLocation}
                    contentLabel="Add Location Modal"
                    style={customStyles}>
                    <AddLocation />
                    <Button onClick={this.closeAddLocation}>close</Button>
                </Modal>
            </div>
        )
    }
}

export default UserInfo;