import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_REQUEST_BY_PAGE,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_ERROR,
    POST_STATUS_ALL,
    FETCH_POSTS_REQUEST_BY_QUERY,
    FETCH_POSTS_REQUEST_BY_STATUS
} from '../constants/posts-types';

const postsList = (state, action) => {
    if (state === undefined) {
        return {
            loading: true,
            totalCount: 0,
            pageSize: 15,
            currentPage: 0,
            posts: [],
            error: null,
            status: POST_STATUS_ALL,
            query: '',
        };
    }

    switch (action.type) {
        case FETCH_POSTS_REQUEST:
            return {
                ...state.postsList,
                currentPage: 0,
                loading: true,
                error: null,
                status: POST_STATUS_ALL,
                query: '',
            };
        case FETCH_POSTS_REQUEST_BY_PAGE:
            return {
                ...state.postsList,
                currentPage: action.payload,
                loading: true,
                error: null,
            };
        case FETCH_POSTS_REQUEST_BY_QUERY:
            return {
                ...state.postsList,
                status: POST_STATUS_ALL,
                query: action.payload,
            };
        case FETCH_POSTS_REQUEST_BY_STATUS:
            return {
                ...state.postsList,
                status: action.payload,
                query: '',
            };
        case FETCH_POSTS_SUCCESS:
            return {
                ...state.postsList,
                posts: action.payload.posts,
                totalCount: action.payload.count,
                loading: false,
            };
        case FETCH_POSTS_ERROR:
            return {
                ...state.postsList,
                loading: false,
                error: action.payload,
            };
        default:
            return state.postsList;
    }
};

export default postsList;