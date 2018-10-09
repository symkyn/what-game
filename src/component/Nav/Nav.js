import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import axios from 'axios';

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

    // componentWillMount() {
    //     axios.get('http://localhost:4000/auth/me')
    //         .then(result => console.log(result)) 
    //         .catch(err => console.warn(err))        
    // }

    render(){
        return(
            <div className='navigation-bar'> {this.state.firstName ? `Welcome ${this.state.firstName}` : null} 
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