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

const Tags = ({fetchTags, tags, loading, error}) => {
    useEffect(() => {
        fetchTags();
    }, [fetchTags]);

    if (error) {
        return <div>Error</div>;
    }

    return (
        <>
            <ContentHeader title="Теги"/>
            <div className="tags__columns">
                <div className="tags__left-column">
                    <FilterBar placeholder="Поиск по тегу">
                        <PaginationTagsContainer />
                    </FilterBar>
                    {
                        loading ? <TagsTable loading={loading}/> : <TagsTable tags={tags}/>
                    }
                </div>
                <div className="tags__right-column">
                    <AddForm/>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = ({tagsList: {tags, loading, error}}) => {
    return {tags, loading, error};
};

const mapDispatchToProps = (dispatch, {dataService}) => {
    return {
        fetchTags: fetchTags(dataService, dispatch),
    };
};

export default compose(
    withDataService(),
    connect(mapStateToProps, mapDispatchToProps),
)(Tags);