import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import * as Actions from '../../redux/reducer';

class Nav extends Component {
    constructor(props){
        super(props)
    }

    // componentWillMount() {
    //     axios.get('http://localhost:4000/auth/me')
    //         .then(result => console.log(result)) 
    //         .catch(err => console.warn(err))        
    // }

    render(){
        return(
            <div className='navigation-bar'> {this.props.firstName ? `Welcome ${this.props.firstName}` : null} 
                <span className='nav=span'>
                    <Link to='/import'> <button>Import BGG Game List</button> </Link>
                    <Link to='/form'> <button>Add New Game</button> </Link>
                    <Link to='/list'> <button>Games!!!</button> </Link>
                    <Link to='/'> <button>logout</button> </Link>
                </span>
            </div>
        )
    }
}

export default connect(state=>state, Actions)(Nav);