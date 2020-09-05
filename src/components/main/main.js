import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Posts from '../pages/posts/posts';
import Tags from '../pages/tags/tags';
import Authors from '../pages/authors/authors';
import PostEditor from '../pages/post-editor/post-editor';
import ProtectedRoute from '../protected-route/protected-route';
import PostView from '../pages/post-editor/post-view';

const Main = () => {
    return (
        <main className="content">
            <Switch>
                <ProtectedRoute exact path='/posts' component={Posts}/>
                <ProtectedRoute exact path='/tags' component={Tags}/>
                <ProtectedRoute exact path='/authors' component={Authors}/>
                <ProtectedRoute exact path='/editor/:postId?' component={PostEditor}/>
                <ProtectedRoute exact path='/post/:postId' component={PostView}/>
                <Route path="/"> <Redirect to="/posts"/></Route>
            </Switch>
        </main>
    );
};

export default Main;