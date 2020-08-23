import React, {useCallback} from 'react';
import Creatable from "react-select/creatable";
import {withAsyncPaginate} from "react-select-async-paginate";

import {withDataService} from '../../../hoc';
import {compose} from 'redux';

const CreatableAsyncPaginate = withAsyncPaginate(Creatable);

const TagsSelect = ({dataService, tags, setTags}) => {
    const filterTags = useCallback((options) => {
        return options.map(tag => {
            return tags.some(item => item.id === tag.id)
                ? {...tag, isDisabled: true}
                : {...tag, isDisabled: false}
        });
    }, [tags]);

    const loadOptions = async (inputValue, prevOptions, {page}) => {
        return await dataService
            .getAllTagsByQuery(inputValue.toLowerCase(), (page - 1) * 15)
            .then(options => {
                const filteredOptions = filterTags(options.tags);
                return {
                    options: filteredOptions,
                    hasMore: options.count > prevOptions.length + filteredOptions.length,
                    additional: {
                        page: page + 1,
                    },
                };
            });
    };

    const handleChange = value => {
        value && setTags(prev => ([...prev, value]));
    };

    const handleCreate = inputValue => {
        setTags(prev => ([...prev, {
            id: null,
            name: inputValue,
        }]));
        console.log('create:', inputValue);
    };

    return (
        <CreatableAsyncPaginate
            key={JSON.stringify(tags)}
            classNamePrefix="react-select"
            value={null}
            loadOptions={loadOptions}
            onChange={handleChange}
            onCreateOption={handleCreate}
            placeholder={'Название тега'}
            // formatCreateLabel={(inputValue) => <span className="react-select__name">`Создать: ${inputValue}`</span>}
            isValidNewOption={(inputValue) => {
                return inputValue && !tags.some(item => item.name === inputValue);
            }}
            getOptionLabel={(option, index) => (
                <span className="react-select__name">{`${option.name || ''} ${option.surname || ''}`}</span>
            )}
            additional={{
                page: 1,
            }}
        />
    );
};

export default compose(
    withDataService()
)(TagsSelect);