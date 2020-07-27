import React from 'react';

import ContentHeader from '../../content-base/content-header';
import FilterBar from '../../filter-bar/filter-bar';
import PostsTable from './posts-table';
import ContentHeaderButton from '../../content-base/content-header-button';

const Posts = () => {
    const selectOptions = [
        {value: 'all', name: 'Все'},
        {value: 'draft', name: 'Черновик'},
        {value: 'published', name: 'Опубликована'},
    ];

    return (
        <>
            <ContentHeader title="Статьи">
                <ContentHeaderButton text="Добавить новую"/>
            </ContentHeader>
            <FilterBar placeholder="Поиск по заголовку">
                <select name="filter" className="search-form__select" defaultValue="">
                    <option value="" disabled hidden>Статус</option>
                    {
                        selectOptions.map(({value, name}) => <option value={value} key={value}>{name}</option>)
                    }
                </select>
            </FilterBar>
            <PostsTable/>
        </>
    );
};

export default Posts;