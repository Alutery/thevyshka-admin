import {
    FETCH_COLLABORATORS_REQUEST,
    FETCH_COLLABORATORS_REQUEST_BY_PAGE,
    FETCH_COLLABORATORS_SUCCESS,
    FETCH_COLLABORATORS_ERROR,
    FETCH_COLLABORATORS_REQUEST_BY_QUERY,
} from '../constants/collaborators-types';

const collaboratorsList = (state, action) => {
    if (state === undefined) {
        return {
            collaborators: [],
            totalCount: 0,
            pageSize: 15,
            currentPage: 0,
            loading: true,
            error: null,
            query: '',
        };
    }

    switch (action.type) {
        case FETCH_COLLABORATORS_REQUEST:
            return {
                ...state.collaboratorsList,
                currentPage: 0,
                loading: true,
                error: null,
                query: '',
            };
        case FETCH_COLLABORATORS_REQUEST_BY_PAGE:
            return {
                ...state.collaboratorsList,
                currentPage: action.payload,
                loading: true,
                error: null,
            };
        case FETCH_COLLABORATORS_REQUEST_BY_QUERY:
            return {
                ...state.collaboratorsList,
                query: action.payload,
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