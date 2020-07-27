import React from 'react';

import ContentHeader from '../../content-base/content-header';
import FilterBar from '../../filter-bar/filter-bar';
import AddForm from './add-form';
import TagsTable from './tags-table';

const Tags = () => {
    return (
        <>
            <ContentHeader title="Теги"/>
            <div className="tags__columns">
                <div className="tags__left-column">
                    <FilterBar placeholder="Поиск по тегу"/>
                    <TagsTable/>
                </div>
                <div className="tags__right-column">
                    <AddForm/>
                </div>
            </div>
        </>
    );
};

export default Tags;