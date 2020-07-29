import React, {useEffect} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import ContentHeader from '../../base/content-header';
import FilterBar from '../../filter-bar/filter-bar';
import PostsTable from './posts-table';
import ContentButton from '../../base/content-button';

import {fetchPosts} from '../../../actions';
import {withDataService} from '../../hoc';

const Posts = ({fetchPosts, posts, loading, error}) => {
    const selectOptions = [
        {value: 'all', name: 'Все'},
        {value: 'draft', name: 'Черновик'},
        {value: 'published', name: 'Опубликована'},
    ];

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    if (error) {
        return <div>Error</div>;
    }

    return (
        <>
            <ContentHeader title="Статьи">
                <ContentButton text="Добавить новую"/>
            </ContentHeader>
            <FilterBar placeholder="Поиск по заголовку">
                <select name="filter" className="search-form__select" defaultValue="">
                    <option value="" disabled hidden>Статус</option>
                    {
                        selectOptions.map(({value, name}) => <option value={value} key={value}>{name}</option>)
                    }
                </select>
            </FilterBar>
            {
                loading ? <PostsTable loading={loading}/> : <PostsTable posts={posts.posts}/>
            }
        </>
    );
};

const mapStateToProps = ({postsList: {posts, loading, error}}) => {
    return {posts, loading, error};
};

const mapDispatchToProps = (dispatch, {dataService}) => {
    return {
        fetchPosts: fetchPosts(dataService, dispatch),
    };
};

export default compose(
    withDataService(),
    connect(mapStateToProps, mapDispatchToProps)
)(Posts);