import React from 'react';
import image from '../../../../images/default-avatar.png';

const CollaboratorItem = ({collaborator, onClick}) => {
    return (
        <div
            className="sidebar__list-item"
            onClick={onClick}
        >
            <img src={image} alt="avatar" className="list-item__img"/>
            <div className="list-item__text">
                <span className="list-item__name">{`${collaborator.name || ''} ${collaborator.surname || ''}`}</span>
                <span className="list-item__role">{collaborator.role || 'Неизвестно'}</span>
            </div>
        </div>
    );
};

export default CollaboratorItem;