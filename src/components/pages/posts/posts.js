import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import {compose} from 'redux';
import {connect} from 'react-redux';

import ContentHeader from '../../base/content-header';
import FilterBar from '../../filter-bar/filter-bar';
import PostsTable from './posts-table';
import PaginationPostsContainer from './pagination-posts-container';

import {fetchPosts} from '../../../actions';
import {withDataService} from '../../hoc';
import ContentSelect from '../../base/content-select';
import Toast from '../../../utils/toast';

const Posts = ({fetchPosts, posts, loading, error, query, status, dataService}) => {
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
        if (query !== newQuery) {
            newQuery ? fetchPosts({'query': newQuery}) : fetchPosts();
        }
    };

    const handleDelete = (postId) => {
        dataService
            .deletePost(postId)
            .then(() => Toast.customSuccess('Статья удалена'))
            .then(() => fetchPosts())
            .catch(() => Toast.customLoadFailed('Произошла ошибка при удалении статьи'));
    };

    if (error) {
        return <div>Error</div>;
    }

    return (
        <>
            <ContentHeader title="Статьи">
                <Link to="/editor" className="content__btn">Добавить новую</Link>
            </ContentHeader>
            <FilterBar placeholder="Поиск по заголовку" onSearch={handleSearch} ref={searchInputRef}>
                <ContentSelect options={selectOptions} current={status} onChangeSelect={handleChangeSelect} initialMessage={"Статус"}/>
                <PaginationPostsContainer/>
            </FilterBar>
            {
                loading ? <PostsTable loading={loading}/> : <PostsTable posts={posts} onDelete={handleDelete}/>
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