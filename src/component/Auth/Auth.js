import React from 'react';
import { Button } from '../Button/Button';
import { Link, Switch, Route  } from 'react-router-dom';

import Login from './Login/Login';
import Register from './Register/Register';

const Auth = () => (
    <div>
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
        </Switch>
        <Link to='/login'>
            <button>Login</button>
        </Link>
        <Link to='/register'>
            <button>Register</button>
        </Link>
    </div>
)

export default Auth;