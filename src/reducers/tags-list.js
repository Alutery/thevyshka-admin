import {FETCH_TAGS_REQUEST, FETCH_TAGS_SUCCESS, FETCH_TAGS_ERROR} from '../constants/tags-types';

const tagsList = (state, action) => {
    if (state === undefined) {
        return {
            tags: [],
            loading: true,
            error: null,
        };
    }

    switch (action.type) {
        case FETCH_TAGS_REQUEST:
            return {
                tags: [],
                loading: true,
                error: null,
            };
        case FETCH_TAGS_SUCCESS:
            return {
                tags: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_TAGS_ERROR:
            return {
                tags: [],
                loading: false,
                error: action.payload,
            };
        default:
            return state.tagsList;
    }
};

export default tagsList;