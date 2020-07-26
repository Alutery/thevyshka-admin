import React from 'react';

import logo from './logo/home.png';

const Header = () => {
    return (
        <div className="header">
            <div className="wrapper header__wrapper">
                <div className="header__logo">
                    <a href="#">
                        <img src={logo} alt="the vyshka logo"/>
                        <span className="logo__text">the vyshka</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Header;
