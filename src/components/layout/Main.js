import React from 'react';
import { Switch, Route } from 'react-router-dom';

import EnterUsername from '../EnterUsername';
import ChatRoom from '../ChatRoom';

export default class Main extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                  <Route exact path='/' component={EnterUsername}/>
                  <Route path='/chatroom' component={ChatRoom}/>
                </Switch>
            </main>
        );
    }
}

