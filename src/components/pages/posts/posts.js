import React from 'react';

import Header from './header';
import FilterBar from './filter-bar';
import PostsTable from './posts-table';

const Posts = () => {
    return (
        <>
            <Header />
            <FilterBar />
            <PostsTable />
        </>
    );
};

export default Posts;