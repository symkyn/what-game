import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';

import Button from './../Button/Button';
import UserGroupCard from './UserGroupCard';
import AddLocation from '../Location/AddLocation';
import LocationCard from '../Location/LocationCard';
import './UserInfo.css';

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
            myLocations: [],
            addLocation: false,
            editLocation: false,
            locationIndex: '',
        }

        this.addLocation = this.addLocation.bind(this);
        this.closeAddLocation = this.closeAddLocation.bind(this);
        this.createNew = this.createNew.bind(this);
        this.editLocation = this.editLocation.bind(this);
        this.closeEditLocation = this.closeEditLocation.bind(this);
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
        axios.get('locations/myPlaces')
            .then(results => {
                this.setState({
                    myLocations: results.data
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

    editLocation(i, e) {
        e.preventDefault();

        this.setState({
            editLocation: true,
            locationIndex: i,
        })
    }

    closeEditLocation() {
        this.setState({
            editLocation: false,
            locationIndex: '',
        })
    }

    createNew(e, location) {
        e.preventDefault();

        let newLocation = Object.assign({}, location);
        delete newLocation.types;
        axios.post('/locations/add', newLocation)
            .then(result => this.setState({
                addLocation: false
            }))
            .catch(err => console.log(err))
    }

    render() {
        const myGroups = this.state.groups.map((g, i) => {
            return (
                <Link className="no-link" to={`information-group/${g.id}`} key={`group-${i}`} >
                    <UserGroupCard key={`user-group-${i}`} g={g}/>
                </Link>
            )
        })
        const locations = this.state.myLocations.map((l, i) => {
            return (
                <div className='location-card' key={`location-${i}`} onClick={(e) => this.editLocation(i, e)}>
                    <LocationCard l={l} />
                </div>
            )
        })
        return(
            <div>
                
                <div className='myinfo'>
                    <div className='my-groups-div'>
                        <h3>My Groups</h3>
                        {myGroups}
                    </div>
                    <div className='my-locations-div'>
                        <h3>My Locations</h3>
                        {locations}
                        { !this.state.addLocation ?
                            <Button onClick={(e) => this.addLocation(e)}>Add Location</Button>
                            : null
                        }
                    </div>
                </div>
                
                <Modal
                    isOpen={this.state.addLocation}
                    onRequestClose={this.closeAddLocation}
                    contentLabel="Add Location Modal"
                    style={customStyles}>
                    <AddLocation createNew={(e, location) => this.createNew(e, location)} />
                    <Button onClick={this.closeAddLocation}>close</Button>
                </Modal>

                <Modal
                    isOpen={this.state.editLocation}
                    onRequestClose={this.closeEditLocation}
                    contentLabel="Edit Location Modal"
                    style={customStyles}>
                    <AddLocation location={this.state.myLocations[this.state.locationIndex]}/>
                    <Button onClick={this.closeEditLocation}>close</Button>
                </Modal>
            </div>
        )
    }
}

export default UserInfo;