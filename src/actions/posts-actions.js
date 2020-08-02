import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_REQUEST_BY_PAGE,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_ERROR,
} from '../constants/posts-types';

const postsRequested = () => {
    return {
        type: FETCH_POSTS_REQUEST,
    };
};

const postsRequestedByPage = (page) => {
    return {
        type: FETCH_POSTS_REQUEST_BY_PAGE,
        payload: page,
    }
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

    dataService.getAllPosts()
        .then(data => dispatch(postsLoaded(data)))
        .catch(error => dispatch(postsError(error)));
};

const fetchPostsByPage = (page, dataService, dispatch) => {
    dispatch(postsRequestedByPage(page));

    dataService.getAllPosts(page * 15)
        .then(data => dispatch(postsLoaded(data)))
        .catch(error => dispatch(postsError(error)));
};

const fetchPostsByQuery = (query, dataService, dispatch) => {
    dispatch(postsRequested());

    dataService.gatAllPostsByQuery(query)
        .then(data => dispatch(postsLoaded(data)))
        .catch(error => dispatch(postsError(error)));
};

const fetchPostsByQueryAndPage = ({query, page}, dataService, dispatch) => {
    dispatch(postsRequestedByPage(page));

    dataService.gatAllPostsByQuery(query, page * 15)
        .then(data => dispatch(postsLoaded(data)))
        .catch(error => dispatch(postsError(error)));
};

export {
    fetchPosts,
    fetchPostsByPage,
    fetchPostsByQuery,
    fetchPostsByQueryAndPage,
};