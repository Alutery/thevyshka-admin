import React from 'react';

const MenuLink = ({ title, isActive }) => {
    return (
        <div className="side-bar__link">
            <span className="side-bar__title">{title}</span>
        </div>
    );
}

export default MenuLink;
