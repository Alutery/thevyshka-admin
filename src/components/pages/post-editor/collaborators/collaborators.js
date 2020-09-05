import React from 'react';

import CollaboratorsSelect from './collaborators-select';
import CollaboratorItem from './collaborator-item';

const Collaborators = ({collaborators, setCollaborators, disabled}) => {
    return (
        <div className="sidebar__section">
            <h3 className="sidebar__title">Авторы</h3>
            <div className="sidebar__list">
                {
                    collaborators
                        .map(collaborator => (
                            <CollaboratorItem
                                key={collaborator.id}
                                collaborator={collaborator}
                                onClick={() => {
                                    !disabled && setCollaborators(collaborators => collaborators.filter(item => item.id !== +collaborator.id));
                                }}
                                onInputChange={(event) => {
                                    setCollaborators(collaborators => collaborators.map(item => item.id === +collaborator.id
                                    ? {...item, role: event.target.value}
                                    : item))
                                }}
                                disabled={disabled}
                            />
                        ))
                }
            </div>
            {!disabled && <CollaboratorsSelect collaborators={collaborators} setCollaborators={setCollaborators}/>}
        </div>
    );
};

export default Collaborators;