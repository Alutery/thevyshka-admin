import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';

import Header from '../header/header';
import SideBar from '../sidebar/sidebar';
import Main from '../main/main';
import AuthorsModal from '../pages/authors/authors-modal';
import Login from '../pages/login/login';

import {getProfileFetch} from '../../actions/auth-actions';

const App = ({getProfileFetch}) => {
    useEffect(() => {
        getProfileFetch();
    }, []);

    return (
        <Switch>
            <Route exact path="/login" component={Login}/>
            <Route path="/">
                <>
                    <Header/>
                    <SideBar/>
                    <Main/>
                    <AuthorsModal/>
                </>
            </Route>
        </Switch>
    );
};

const mapDispatchToProps = dispatch => ({
    getProfileFetch: () => dispatch(getProfileFetch()),
});

export default connect(null, mapDispatchToProps)(App);
