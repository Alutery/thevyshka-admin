import {
    FETCH_TAGS_REQUEST,
    FETCH_TAGS_SUCCESS,
    FETCH_TAGS_ERROR,
    FETCH_TAGS_REQUEST_BY_PAGE, FETCH_TAGS_REQUEST_BY_QUERY
} from '../constants/tags-types';

const tagsList = (state, action) => {
    if (state === undefined) {
        return {
            tags: [],
            totalTagsCount: 0,
            pageSize: 15,
            currentPage: 0,
            loading: true,
            error: null,
        };
    }

    switch (action.type) {
        case FETCH_TAGS_REQUEST:
            return {
                ...state.tagsList,
                loading: true,
                error: null,
            };
        case FETCH_TAGS_REQUEST_BY_PAGE:
            return {
                ...state.tagsList,
                currentPage: action.payload,
                loading: true,
                error: null,
            };
        case FETCH_TAGS_REQUEST_BY_QUERY:
            return {
                ...state.tagsList,
                query: action.payload,
            };
        case FETCH_TAGS_SUCCESS:
            return {
                ...state.tagsList,
                tags: action.payload.tags,
                totalTagsCount: action.payload.count,
                loading: false,
            };
        case FETCH_TAGS_ERROR:
            return {
                ...state.tagsList,
                loading: false,
                error: action.payload,
            };
        default:
            return state.tagsList;
    }
};

export default tagsList;