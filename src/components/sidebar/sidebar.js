import React from 'react';
import MenuLink from './menu-link';

const SideBar = () => {
    return (
        <div className="side-bar">
            <nav className="side-bar__menu">
                <MenuLink title="Cтатьи" />
                <MenuLink title="Рубрики" />
                <MenuLink title="Теги" />
                <MenuLink title="Авторы" />
            </nav>
        </div>
    );
};

export default SideBar;
