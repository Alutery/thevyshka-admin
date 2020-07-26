import React from 'react';
import {NavLink} from 'react-router-dom';

const MenuLink = ({ title, path = '' }) => {
    return (
        <NavLink to={'/' + path} className="side-bar__link" activeClassName="side-bar__link_active">
            <span className="side-bar__title">{title}</span>
        </NavLink>
    );
}

export default MenuLink;