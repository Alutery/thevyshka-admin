import React from 'react';
import image from '../../../../images/default-avatar.png';
import CollaboratorsSelect from './collaborators-select';
import CollaboratorItem from './collaborator-item';

const Collaborators = ({collaborators, setCollaborators}) => {
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
                                    setCollaborators(collaborators => collaborators.filter(item => item.id !== +collaborator.id));
                                }}
                            />
                        ))
                }
            </div>
            <CollaboratorsSelect collaborators={collaborators} setCollaborators={setCollaborators}/>
        </div>
    );
};

export default Collaborators;