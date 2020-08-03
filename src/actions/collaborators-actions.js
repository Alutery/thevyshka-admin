import {
    FETCH_COLLABORATORS_REQUEST,
    FETCH_COLLABORATORS_REQUEST_BY_PAGE,
    FETCH_COLLABORATORS_SUCCESS,
    FETCH_COLLABORATORS_ERROR,
} from '../constants/collaborators-types';

const collaboratorsRequested = () => {
    return {
        type: FETCH_COLLABORATORS_REQUEST,
    };
};

const collaboratorsRequestedByPage = (page) => {
    return {
        type: FETCH_COLLABORATORS_REQUEST_BY_PAGE,
        payload: page,
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

const fetchCollaborators = (dataService, dispatch) => () => {
    dispatch(collaboratorsRequested());

    dataService.getCollaborators()
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