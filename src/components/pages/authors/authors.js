import React from 'react';

import ContentHeader from '../../content-base/content-header';
import FilterBar from '../../filter-bar/filter-bar';
import AuthorsTable from './authors-table';
import ContentHeaderButton from '../../content-base/content-header-button';

const Authors = () => {
    return (
        <>
            <ContentHeader title="Редакция">
                <ContentHeaderButton text="Добавить нового"/>
            </ContentHeader>
            <FilterBar placeholder="Поиск по имени"/>
            <AuthorsTable/>
        </>
    );
};

export default Authors;