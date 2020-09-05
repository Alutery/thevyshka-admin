import React from 'react';
import image from '../../../../images/default-avatar.png';

const CollaboratorItem = ({collaborator, onClick, onInputChange, disabled}) => {
    return (
        <div
            className="sidebar__list-item"
            onClick={(event) => {
                if (event.target.dataset.type === 'collaborator-item-input') {
                    return;
                }
                onClick();
            }}
        >
            <img className="list-item__img" src={collaborator.photo ? process.env.REACT_APP_URL + collaborator.photo : image} alt="avatar"/>
            <div className="list-item__text">
                <span className="list-item__name">{`${collaborator.name || ''} ${collaborator.surname || ''}`}</span>
                <input
                    data-type="collaborator-item-input"
                    type="text"
                    className="list-item__input"
                    placeholder="Роль"
                    name="query" value={collaborator.role || ''}
                    onChange={onInputChange}
                    required
                    disabled={disabled}
                />
            </div>
        </div>
    );
};

export default CollaboratorItem;