import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {withDataService} from '../../hoc';
import {fetchPostsByPage} from '../../../actions';

import ContentPagination from '../../base/content-pagination';

const PaginationPostsContainer = (props) => {
    return (
        <ContentPagination {...props} />
    );
};

const mapStateToProps = ({postsList: {totalCount, pageSize, currentPage}}) => {
    return {total: totalCount, pageSize, currentPage};
};

const mapDispatchToProps = (dispatch, {dataService}) => {
    return {
        onCurrentPageChange: (page) => {
            fetchPostsByPage(page, dataService, dispatch);
        },
    };
};

export default compose(
    withDataService(),
    connect(mapStateToProps, mapDispatchToProps),
)(PaginationPostsContainer);