import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from '../../../redux/reducer';

class Register extends Component {
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            bggid: ''
        }
    }

    render(){
        return(
            <div className='register-page'>
                <h2>Register</h2>
                <form className="register-box" onSubmit={e => this.handleSubmit(e)}>
                    <div className="input-row">
                        <div className="input">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                onChange={e => this.handleChange('username', e.target.value)}
                                value={this.state.username} />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name=""
                                id="password"
                                onChange={e => this.handleChange('password', e.target.value)}
                                value={this.state.password} />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input">
                            <label htmlFor="firstname">First Name</label>
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                onChange={e => this.handleChange('firstname', e.target.value)}
                                value={this.state.firstname} />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input">
                            <label htmlFor="lastname">Last Name</label>
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                onChange={e => this.handleChange('lastname', e.target.value)}
                                value={this.state.lastname} />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input">
                            <label htmlFor="bggid">BGG User Name</label>
                            <input
                                type="text"
                                name="bggid"
                                id="bggid"
                                onChange={e => this.handleChange('bggid', e.target.value)}
                                value={this.state.bggid} />
                        </div>
                    </div>
                    <button type="submit">Register</button>
                </form>
                
                <Link to="/login">Already have an account? Log in!</Link>
            </div>
        )
    }

    handleChange(field, value) {
        this.setState({ [field]: value });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        axios.post('/auth/register', this.state)
            .then(results => {
                this.props.updateCurrentUser(
                        results.data.bggid, 
                        results.data.username, 
                        results.data.firstname, 
                        results.data.lastname
                    )
                this.props.history.push('/list');
            })
            .catch(err => {
                console.warn(err);
            });
    }
}

export default connect(state=>state, Actions)(Register);