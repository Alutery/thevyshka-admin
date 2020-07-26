import React from 'react';

import logo from './logo/home.png';
import textLogo from './logo/text-logo.png';

const Header = () => {
    return (
        <div className="header">
            <div className="header__logo">
                <img src={logo} alt="" rel="logo"/>
                <img src={textLogo} alt="the vyshka" rel="logo"/>
            </div>
        </div>
    );
};

export default Header;
