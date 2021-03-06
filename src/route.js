import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from './component/Auth/Auth';
import Import from './component/Import/Import';
import List from './component/List/List';
import GameDetail from './component/GameDetail/GameDetail';
import Groups from './component/Groups/Groups';
import Login from './component/Auth/Login/Login';
import Register from './component/Auth/Register/Register';
import UserInfo from './component/Auth/UserInfo';
import GroupList from './component/List/GroupList';

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/userInfo' component={UserInfo} />
        <Route path='/import' component={Import} />
        <Route path='/list' component={List} />
        <Route path='/game/:gameid/:groupid' component={GameDetail} />
        <Route path='/information-group/:groupid' component={GroupList} />
        <Route path='/groups' component={Groups} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
    </Switch>
)