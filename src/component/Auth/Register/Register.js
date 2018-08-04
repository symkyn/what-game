import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor(){
        super()

        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            bggID: ''
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
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                onChange={e => this.handleChange('firstName', e.target.value)}
                                value={this.state.firstName} />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                onChange={e => this.handleChange('lastName', e.target.value)}
                                value={this.state.lastName} />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input">
                            <label htmlFor="bggID">BGG User Name</label>
                            <input
                                type="text"
                                name="bggID"
                                id="bggID"
                                onChange={e => this.handleChange('bggID', e.target.value)}
                                value={this.state.bggID} />
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
            .then(user => {
                console.log(user);
            })
            .catch(err => {
                console.warn(err);
            });
    }
}

export default Register;