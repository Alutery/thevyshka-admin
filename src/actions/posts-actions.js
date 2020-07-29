import {FETCH_POSTS_ERROR, FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS} from '../constants/posts-types';

const postsRequested = () => {
    return {
        type: FETCH_POSTS_REQUEST,
    };
};

const postsLoaded = (posts) => {
    return {
        type: FETCH_POSTS_SUCCESS,
        payload: posts,
    };
};

const postsError = (error) => {
    return {
        type: FETCH_POSTS_ERROR,
        payload: error,
    };
};

const fetchPosts = (dataService, dispatch) => () => {
    dispatch(postsRequested());
    dataService.getPosts()
        .then(data => dispatch(postsLoaded(data)))
        .catch(error => dispatch(postsError(error)));
};

export {
    fetchPosts,
};