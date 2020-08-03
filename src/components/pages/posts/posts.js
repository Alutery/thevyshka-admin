import React, {useEffect} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import ContentHeader from '../../base/content-header';
import FilterBar from '../../filter-bar/filter-bar';
import PostsTable from './posts-table';
import ContentButton from '../../base/content-button';
import PaginationPostsContainer from './pagination-posts-container';

import {fetchPosts} from '../../../actions';
import {withDataService} from '../../hoc';
import ContentSelect from '../../base/content-select';

const Posts = ({fetchPosts, posts, loading, error, query, status}) => {
    const selectOptions = [
        {key: 1, value: 'all', name: 'Все', default: true},
        {key: 2, value: 'draft', name: 'Черновик'},
        {key: 3, value: 'published', name: 'Опубликована'},
    ];

    const searchInputRef = React.createRef();

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleChangeSelect = (value) => {
        searchInputRef.current.value = '';
        fetchPosts({'status': value});
    };

    const handleSearch = (newQuery) => {
        if(query !== newQuery) {
            newQuery ? fetchPosts({'query': newQuery}) : fetchPosts();
        }
    };

    if (error) {
        return <div>Error</div>;
    }

    return (
        <>
            <ContentHeader title="Статьи">
                <ContentButton text="Добавить новую"/>
            </ContentHeader>
            <FilterBar placeholder="Поиск по заголовку" onSearch={handleSearch} ref={searchInputRef}>
                <ContentSelect options={selectOptions} currentStatus={status} onChangeSelect={handleChangeSelect}/>
                <PaginationPostsContainer/>
            </FilterBar>
            {
                loading ? <PostsTable loading={loading}/> : <PostsTable posts={posts}/>
            }
        </>
    );
};

const mapStateToProps = ({postsList: {posts, loading, error, currentPage, query, status}}) => {
    return {posts, loading, error, currentPage, query, status};
};

const mapDispatchToProps = (dispatch, {dataService}) => {
    return {
        fetchPosts: (filter = {}) => fetchPosts(filter, dataService, dispatch),
    };
};

export default compose(
    withDataService(),
    connect(mapStateToProps, mapDispatchToProps)
)(Posts);