import {FETCH_POSTS_ERROR, FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS} from '../constants/posts-types';

const postsList = (state, action) => {
    if (state === undefined) {
        return {
            loading: false,
            posts: [],
            error: null,
        };
    }

    switch (action.type) {
        case FETCH_POSTS_REQUEST:
            return {
                posts: [],
                loading: true,
                error: null,
            };
        case FETCH_POSTS_SUCCESS:
            return {
                posts: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_POSTS_ERROR:
            return {
                posts: [],
                loading: false,
                error: action.payload,
            };
        default:
            return state.postsList;
    }
};

export default postsList;