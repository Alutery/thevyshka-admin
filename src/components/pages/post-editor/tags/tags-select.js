import React, {useCallback, useState} from 'react';
import Creatable from "react-select/creatable";
import {withAsyncPaginate} from "react-select-async-paginate";

import {withDataService} from '../../../hoc';
import {compose} from 'redux';

const CreatableAsyncPaginate = withAsyncPaginate(Creatable);

const TagsSelect = ({dataService, tags, setTags}) => {
    const [isAddingInProgress, setIsAddingInProgress] = useState(false);

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
    };

    const onCreateOption = useCallback(async inputValue => {
        setIsAddingInProgress(true);

        setTags(prev => ([...prev, {
            id: null,
            name: inputValue,
        }]));

        setIsAddingInProgress(false);
    }, []);

    const options = [];
    for (let i = 0; i < 50; ++i) {
        options.push({
            value: i + 1,
            label: `Option ${i + 1}`
        });
    }
    const sleep = ms =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    const loadOptions2 = async (search, prevOptions) => {
        await sleep(1000);

        let filteredOptions;
        if (!search) {
            filteredOptions = options;
        } else {
            const searchLower = search.toLowerCase();

            filteredOptions = options.filter(({ label }) =>
                label.toLowerCase().includes(searchLower)
            );
        }

        const hasMore = filteredOptions.length > prevOptions.length + 10;
        const slicedOptions = filteredOptions.slice(
            prevOptions.length,
            prevOptions.length + 10
        );

        return {
            options: slicedOptions,
            hasMore
        };
    };
    return (
        <CreatableAsyncPaginate
            key={JSON.stringify(tags)}
            classNamePrefix="react-select"
            value={'ddd'}
            isDisabled={isAddingInProgress}
            loadOptions={loadOptions}
            onChange={handleChange}
            onCreateOption={onCreateOption}
            placeholder={'Название тега'}
            closeMenuOnSelect={false}
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