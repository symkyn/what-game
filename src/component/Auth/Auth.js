import React from 'react';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';

const Auth = () => (
    <div>
        <h2 className='welcome'>Welcome to 'What Game'</h2>
        <Link to='/login'>
            <button>Login</button>
        </Link>
        <Link to='/register'>
            <button>Register</button>
        </Link>
    </div>
)

export default Auth;