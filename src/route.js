import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from './component/Auth/Auth';
import Import from './component/Import/Import';
import List from './component/List/List';
import Game from './component/Game/Game';
import Form from './component/Form/Form';

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/import' component={Import} />
        <Route path='/list' component={List} />
        <Route path='/game/:gameid' component={Game} />
        <Route path='/form' component={Form} />
    </Switch>
)