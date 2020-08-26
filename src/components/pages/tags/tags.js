import React, {useEffect} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import ContentHeader from '../../base/content-header';
import FilterBar from '../../filter-bar/filter-bar';
import AddForm from './add-form';
import TagsTable from './tags-table';
import PaginationTagsContainer from './pagination-tags-container';

import {withDataService} from '../../hoc';
import {fetchTags} from '../../../actions';

const Tags = ({fetchTags, tags, loading, error, query, dataService}) => {
    useEffect(() => {
        fetchTags();
    }, [fetchTags]);

    if (error) {
        return <div>Error</div>;
    }

    const handleSubmitSearch = (newQuery) => {
        if (query !== newQuery) {
            newQuery ? fetchTags({'query': newQuery}) : fetchTags();
        }
    };

    const handleSubmitForm = (name) => {
        dataService
            .createTag(name)
            .then(fetchTags);
    };

    return (
        <>
            <ContentHeader title="Теги"/>
            <div className="tags__columns">
                <div className="tags__left-column">
                    <FilterBar placeholder="Поиск по тегу" onSearch={handleSubmitSearch}>
                        <PaginationTagsContainer/>
                    </FilterBar>
                    {
                        loading ? <TagsTable loading={loading}/> : <TagsTable tags={tags} fetchTags={fetchTags}/>
                    }
                </div>
                <div className="tags__right-column">
                    <AddForm onSubmit={handleSubmitForm}/>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = ({tagsList: {tags, query, loading, error}}) => {
    return {tags, query, loading, error};
};

const mapDispatchToProps = (dispatch, {dataService}) => {
    return {
        fetchTags: (filter) => fetchTags(filter, dataService, dispatch),
    };
};

export default compose(
    withDataService(),
    connect(mapStateToProps, mapDispatchToProps),
)(Tags);