import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Nav.css';
import * as Actions from '../../redux/reducer';
import Button from '../Button/Button';

class Nav extends Component {
    constructor(props){
        super(props)

        this.state={
            firstName: this.props.firstName,
        }
    }

    componentWillMount() {
        axios.get('/auth/me')
            .then(results => {
                this.props.updateCurrentUser(
                    results.data.bggid, 
                    results.data.username, 
                    results.data.firstname, 
                    results.data.lastname
                ) 
                    this.setState({
                        firstName: results.data.firstname,
                    })
            })
            .catch(err => console.warn(err))        
    }

    logout(e) {
        // e.preventDefault();

        axios.post('/auth/logout')
            .then(result => {
                console.log(result)
            }) 
            .catch(err => console.warn(err))
    }

    render(){
        return(
            <div className='navigation-bar'> {this.state.firstName ? `Welcome ${this.state.firstName}` : null} 
                <span className='nav=span'>
                    <Link to='/userInfo'> <Button className='nav-button'>User Profile</Button> </Link>
                    <Link to='/groups'> <Button className='nav-button'>Manage Groups</Button> </Link>
                    <Link to='/import'> <Button className='nav-button'>Import From BGG</Button> </Link>
                    <Link to='/list'> <Button className='nav-button'>My Games</Button> </Link>
                    <Link to='/'> <Button onClick={(e) => this.logout(e)} className='nav-button'>logout</Button> </Link>
                </span>
            </div>
        )
    }
}

export default connect(state=>state, Actions)(Nav);