import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {withDataService} from '../../hoc';
import {fetchTagsByPage} from '../../../actions';

import ContentPagination from '../../base/content-pagination';

const PaginationTagsContainer = (props) => {
    return (
        <ContentPagination {...props} />
    );
};

const mapStateToProps = ({tagsList: {totalTagsCount, pageSize, currentPage}}) => {
    return {total: totalTagsCount, pageSize, currentPage};
};

const mapDispatchToProps = (dispatch, {dataService}) => {
    return {
        onCurrentPageChange: (page) => {
            fetchTagsByPage(page, dataService, dispatch);
        },
    };
};

export default compose(
    withDataService(),
    connect(mapStateToProps, mapDispatchToProps),
)(PaginationTagsContainer);