import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
            <div className='login-page'>
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
                    <button type='submit'>login</button>
                </form>
                <Link to="/register">Don't have an account? Register!</Link>
            </div>
        )
    }

    login(e) {
        e.preventDefault();
        
        axios.post('http://localhost:4000/auth/login', this.state)
            .then(results => {
                console.log(results)
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