import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Actions from '../../redux/reducer';

class Nav extends Component {
    constructor(props){
        super(props)
    }

    componentWillMount() {
        axios.get('/auth/currentUser')
            .then(result => {
                console.log(result)
            })
            .catch(err => console.warn(err))
    }

    render(){
        console.log(this.props)
        return(
            <div className='navigation-bar'>Nav</div>
        )
    }
}

export default connect(state=>state, Actions)(Nav);