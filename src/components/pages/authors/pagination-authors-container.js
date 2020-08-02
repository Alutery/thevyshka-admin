import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {withDataService} from '../../hoc';
import {fetchCollaboratorsByPage} from '../../../actions';

import ContentPagination from '../../base/content-pagination';

const PaginationAuthorsContainer = (props) => {
    return (
        <ContentPagination {...props} />
    );
};

const mapStateToProps = ({collaboratorsList: {totalCount, pageSize, currentPage}}) => {
    return {total: totalCount, pageSize, currentPage: currentPage};
};

const mapDispatchToProps = (dispatch, {dataService}) => {
    return {
        onCurrentPageChange: (page) => {
            fetchCollaboratorsByPage(page, dataService, dispatch);
        },
    };
};

export default compose(
    withDataService(),
    connect(mapStateToProps, mapDispatchToProps),
)(PaginationAuthorsContainer);