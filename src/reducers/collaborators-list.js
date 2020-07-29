import {FETCH_COLLABORATORS_REQUEST, FETCH_COLLABORATORS_SUCCESS, FETCH_COLLABORATORS_ERROR} from '../constants/collaborators-types';

const collaboratorsList = (state, action) => {
    if (state === undefined) {
        return {
            collaborators: [],
            loading: true,
            error: null,
        };
    }

    switch (action.type) {
        case FETCH_COLLABORATORS_REQUEST:
            return {
                collaborators: [],
                loading: true,
                error: null,
            };
        case FETCH_COLLABORATORS_SUCCESS:
            return {
                collaborators: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_COLLABORATORS_ERROR:
            return {
                collaborators: [],
                loading: false,
                error: action.payload,
            };
        default:
            return state.collaboratorsList;
    }
};

export default collaboratorsList;