import React, {useCallback} from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';

import {withDataService} from '../../../hoc';
import {compose} from 'redux';

import image from '../../../../images/default-avatar.png';

const CollaboratorsSelect = ({dataService, collaborators, setCollaborators}) => {

    const filterCollaborators = useCallback((options) => {
        return options.map(collaborator => {
            return collaborators.some(item => item.id === collaborator.id)
            ? {...collaborator, isDisabled: true}
            : {...collaborator, isDisabled: false}
        });
    }, [collaborators]);

    const loadOptions = async (inputValue, prevOptions, {page}) => {
        return await dataService
            .getCollaboratorsByQuery(inputValue.toLowerCase(), (page - 1) * 15)
            .then(options => {
                const filteredOptions = filterCollaborators(options.collaborators);
                return  {
                    options: filteredOptions,
                    hasMore: options.count > prevOptions.length + filteredOptions.length,
                    additional: {
                        page: page + 1,
                    },
                };
            });
    };

    const handleChange = value => {
        value && setCollaborators(prev => ([...prev, value]));
    };

    const noOptionsMessage = () => {
        return 'Автор не найден';
    };

    return (
        <AsyncPaginate
            key={JSON.stringify(collaborators)}
            classNamePrefix="react-select"
            value={null}
            loadOptions={loadOptions}
            onChange={handleChange}
            placeholder={'Имя автора'}
            noOptionsMessage={noOptionsMessage}
            getOptionLabel={option => (
                <div className="react-select__list-item">
                    <img className="react-select__img" src={option.photo ? process.env.REACT_APP_URL + option.photo : image} alt="avatar"/>
                    <div className="list-item__text">
                        <span className="react-select__name">{`${option.name || ''} ${option.surname || ''}`}</span>
                    </div>
                </div>
            )}
            additional={{
                page: 1,
            }}
        />
    );
};

export default compose(
    withDataService()
)(CollaboratorsSelect);