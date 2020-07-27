import React from 'react';
import MenuLink from './menu-link';

const SideBar = () => {
    return (
        <div className="side-bar">
            <nav className="side-bar__menu">
                <MenuLink title="Cтатьи" path="posts" isActive />
                <MenuLink title="Теги" path="tags" />
                <MenuLink title="Авторы" path="authors" />
            </nav>
        </div>
    );
};

export default SideBar;
