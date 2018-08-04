import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Nav extends Component {
    constructor(props){
        super(props)
    }

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

export default connect(state=>state)(Nav);