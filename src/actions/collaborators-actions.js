import {
    FETCH_COLLABORATORS_REQUEST_BY_PAGE,
    FETCH_COLLABORATORS_SUCCESS,
    FETCH_COLLABORATORS_ERROR,
    FETCH_COLLABORATORS_REQUEST_BY_QUERY,
} from '../constants/collaborators-types';

import {PAGE_SIZE} from '../constants/common';

const collaboratorsRequestedByPage = (page) => {
    return {
        type: FETCH_COLLABORATORS_REQUEST_BY_PAGE,
        payload: page,
    };
};

const collaboratorsRequestedByQuery = (query) => {
    return {
        type: FETCH_COLLABORATORS_REQUEST_BY_QUERY,
        payload: query,
    };
};

const collaboratorsLoaded = (data) => {
    return {
        type: FETCH_COLLABORATORS_SUCCESS,
        payload: data,
    };
};

const collaboratorsError = (error) => {
    return {
        type: FETCH_COLLABORATORS_ERROR,
        payload: error,
    };
};

const fetchCollaborators = ({page = 0, query} = {}, dataService, dispatch) => {
    if (query) {
        return _fetchCollaboratorsByQuery({page, query}, dataService, dispatch);
    }

    dispatch(collaboratorsRequestedByPage(page));
    dataService.getCollaborators(page * PAGE_SIZE)
        .then(data => dispatch(collaboratorsLoaded(data)))
        .catch(error => dispatch(collaboratorsError(error)));
};

const _fetchCollaboratorsByQuery = ({query, page = 0}, dataService, dispatch) => {
    dispatch(collaboratorsRequestedByQuery(query));

    dataService.getCollaboratorsByQuery(query, page * PAGE_SIZE)
        .then(data => dispatch(collaboratorsLoaded(data)))
        .catch(error => dispatch(collaboratorsError(error)));
};

const fetchCollaboratorsByPage = (page = 0, dataService, dispatch) => {
    dispatch(collaboratorsRequestedByPage(page));

    dataService.getCollaborators(page * 15)
        .then(data => dispatch(collaboratorsLoaded(data)))
        .catch(error => dispatch(collaboratorsError(error)));
};

export {
    fetchCollaborators,
    fetchCollaboratorsByPage,
};