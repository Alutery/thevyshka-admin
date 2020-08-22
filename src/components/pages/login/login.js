import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import LoginForm from './login-form';
import {Redirect} from 'react-router-dom';

const Login = ({currentUser}) => {
    const [redirect, setRedirect] = useState(!!currentUser);

    useEffect(() => {
        setRedirect(!!currentUser);
    }, [currentUser]);

    if(redirect) {
        return <Redirect to="/posts"/>;
    }

    return (
        <div className="login-page">
            <h1>The Vyshka Admin</h1>
            <LoginForm/>
        </div>
    );
};

const mapStateToProps = ({auth: {currentUser}}) => ({
    currentUser,
});

export default connect(mapStateToProps, null)(Login);