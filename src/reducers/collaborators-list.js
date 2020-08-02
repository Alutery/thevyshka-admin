import {
    FETCH_COLLABORATORS_REQUEST,
    FETCH_COLLABORATORS_REQUEST_BY_PAGE,
    FETCH_COLLABORATORS_SUCCESS,
    FETCH_COLLABORATORS_ERROR
} from '../constants/collaborators-types';

const collaboratorsList = (state, action) => {
    if (state === undefined) {
        return {
            collaborators: [],
            totalCount: 0,
            pageSize: 15,
            currentPage: 1,
            loading: true,
            error: null,
        };
    }

    switch (action.type) {
        case FETCH_COLLABORATORS_REQUEST:
            return {
                ...state.collaboratorsList,
                loading: true,
                error: null,
            };
        case FETCH_COLLABORATORS_REQUEST_BY_PAGE:
            return {
                ...state.collaboratorsList,
                currentPage: action.payload,
                loading: true,
                error: null,
            };
        case FETCH_COLLABORATORS_SUCCESS:
            return {
                ...state.collaboratorsList,
                collaborators: action.payload,
                totalCount: action.payload.count,
                loading: false,
            };
        case FETCH_COLLABORATORS_ERROR:
            return {
                ...state.collaboratorsList,
                loading: false,
                error: action.payload,
            };
        default:
            return state.collaboratorsList;
    }
};

export default collaboratorsList;