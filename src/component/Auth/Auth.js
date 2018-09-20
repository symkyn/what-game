import React from 'react';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

const Auth = () => (
    <div>
        <h2 className='welcome'>Welcome to 'What Game'</h2>
        <Link to='/login'>
            <Button className='auth-button'>Login</Button>
        </Link>
        <Link to='/register'>
            <Button className='auth-button'>Register</Button>
        </Link>
    </div>
)

export default Auth;