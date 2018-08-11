import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from './component/Auth/Auth';
import Import from './component/Import/Import';
import List from './component/List/List';
import GameDetail from './component/GameDetail/GameDetail';
import Form from './component/Form/Form';
import Login from './component/Auth/Login/Login';
import Register from './component/Auth/Register/Register';

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/import' component={Import} />
        <Route path='/list' component={List} />
        <Route path='/game/:gameid' component={GameDetail} />
        <Route path='/form' component={Form} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
    </Switch>
)