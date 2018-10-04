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
    }

    componentWillMount() {
        axios.get('http://localhost:4000/auth/me')
            .then(result => console.log(result)) 
            .catch(err => console.warn(err))        
    }

    render(){
        return(
            <div className='navigation-bar'> {this.props.firstName ? `Welcome ${this.props.firstName}` : null} 
                <span className='nav=span'>
                    <Link to='/import'> <Button className='nav-button'>Import BGG Game List</Button> </Link>
                    <Link to='/list'> <Button className='nav-button'>Games!!!</Button> </Link>
                    <Link to='/'> <Button className='nav-button'>logout</Button> </Link>
                </span>
            </div>
        )
    }
}

export default connect(state=>state, Actions)(Nav);