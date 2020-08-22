import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from "react-router-dom";

const ProtectedRoute = ({currentUser, component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props =>
                currentUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login"/>
                )
            }
        />
    );
};

const mapStateToProps = ({auth: {currentUser}}) => ({
    currentUser,
});

export default connect(mapStateToProps, null)(ProtectedRoute);