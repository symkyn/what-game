import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../Button/Button';

import * as Actions from '../../../redux/reducer';

class Login extends Component {
    constructor(props){
        super(props)

        this.state={
            username: '',
            password: ''
        }
        this.handleChange=this.handleChange.bind(this);
        this.login=this.login.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return(
            <div className='parent-auth-box'>
                <div className='auth-box'>
                    <h2>login</h2>
                    <form className='login-box' onSubmit={(e)=>this.login(e)}>
                        <label htmlFor="username">Username: </label>
                            <input 
                                    name='username' 
                                    type='text' 
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.username} 
                                />
                        <label htmlFor="password">Password: </label>
                            <input 
                                    name='password' 
                                    type='password' 
                                    onChange={(e) =>this.handleChange(e)}
                                    value={this.state.password} 
                                />
                        <Button type='submit' className='auth-button'>login</Button>
                    </form>
                    <Link to="/register">Don't have an account? Register!</Link>
                </div>
            </div>
        )
    }

    login(e) {
        e.preventDefault();

        console.log(this.state);
        
        axios.post('/auth/login', this.state)
            .then(results => {
                this.props.updateCurrentUser(
                    results.data.bggid, 
                    results.data.username, 
                    results.data.firstname, 
                    results.data.lastname
                )
                this.props.history.push('/list');
            })
            .catch(err => console.warn(err))
    }
}

export default connect(state => state, Actions)(Login);