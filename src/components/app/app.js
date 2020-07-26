import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';

import Header from '../header/header';
import Posts from '../routes/posts/posts';
import SideBar from '../sidebar/sidebar';

const App = () => {
    return (
        <Router>
            <Header/>
            <SideBar/>
            <Switch>
                <Posts/>
            </Switch>
        </Router>
    );
};

export default App;
