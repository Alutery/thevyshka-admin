import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {withDataService} from '../../hoc';
import {fetchPosts} from '../../../actions';

import ContentPagination from '../../base/content-pagination';

const PaginationPostsContainer = (props) => {
    return (
        <ContentPagination {...props} />
    );
};

const mapStateToProps = ({postsList: {totalCount, pageSize, currentPage, status, query}}) => {
    return {total: totalCount, pageSize, currentPage, status, query};
};

const mapDispatchToProps = (dispatch, {dataService}) => {
    return {
        onCurrentPageChange: (filter) => {
            fetchPosts(filter, dataService, dispatch);
        },
    };
};

export default compose(
    withDataService(),
    connect(mapStateToProps, mapDispatchToProps),
)(PaginationPostsContainer);