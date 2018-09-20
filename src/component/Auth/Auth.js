import React from 'react';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

import './Auth.css';

const Auth = () => (
    <div className="parent-auth-box">
        <div className='auth-box'>
            <h2 className='welcome'>Welcome to 'What Game'</h2>
            <div className="button-div">
                <img 
                        src={require('../../board-game-icon.png')} 
                        className='auth-logo' />
                <div className='child-button-div'>
                    <Link to='/login'>
                        <Button className='auth-button'>Login</Button>
                    </Link>
                </div>
                <div className='child-button-div'>
                    <Link to='/register'>
                        <Button className='auth-button'>Register</Button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
)

export default Auth;