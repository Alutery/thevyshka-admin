import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Posts from '../pages/posts/posts';
import Tags from '../pages/tags/tags';
import Authors from '../pages/authors/authors';

const Main = () => {
    return (
        <main className="content">
            <Switch>
                <Route exact path="/"> <Redirect to="/posts" /></Route>
                <Route exact path='/posts' component={Posts} />
                <Route exact path='/tags' component={Tags} />
                <Route exact path='/authors' component={Authors} />
            </Switch>
        </main>
    );
};

export default Main;