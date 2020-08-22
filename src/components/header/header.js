import React from 'react';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/auth-actions';

import logo from './logo/home.png';
import textLogo from './logo/text-logo.png';

const Header = ({logoutUser}) => {
    const handleLogoutClick = event => {
        event.preventDefault();

        localStorage.removeItem('token');
        logoutUser();
    };

    return (
        <div className="header">
            <div className="header__logo">
                <img src={logo} alt="" rel="logo"/>
                <img src={textLogo} alt="the vyshka" rel="logo"/>
                <button
                    type="button"
                    className="header__logout"
                    onClick={handleLogoutClick}
                >
                    Выйти
                </button>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
});

export default connect(null, mapDispatchToProps)(Header);
