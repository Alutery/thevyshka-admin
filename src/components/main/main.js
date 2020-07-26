import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Posts from '../routes/posts/posts';

const Main = () => {
    return (
        <main className="content">
            <Switch>
                <Route exact path='/' component={Posts}/>
                {/*<Route exact path='/tags' component={Tags}/>*/}
                {/*<Route exact path='/authors' component={Athors}/>*/}
            </Switch>
        </main>
    );
};

export default Main;
