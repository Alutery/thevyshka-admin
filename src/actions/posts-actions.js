import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_REQUEST_BY_PAGE,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_ERROR,
    FETCH_PUBLISHED_POSTS_REQUEST,
    FETCH_PUBLISHED_POSTS_REQUEST_BY_PAGE,
    FETCH_DRAFT_POSTS_REQUEST,
    FETCH_DRAFT_POSTS_REQUEST_BY_PAGE,
    FETCH_POSTS_REQUEST_BY_QUERY,
    FETCH_POSTS_REQUEST_BY_QUERY_AND_PAGE,
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

// const postsRequestedByQuery = () => {
//     return {
//         type: FETCH_POSTS_REQUEST_BY_QUERY,
//     }
// };
//
// const postsRequestedByQueryAndPage = (query, page) => {
//     return {
//         type: FETCH_POSTS_REQUEST_BY_QUERY_AND_PAGE,
//         payload: {query, page},
//     }
// };
//
// const publishedPostsRequestedByPage = (page) => {
//     return {
//         type: FETCH_PUBLISHED_POSTS_REQUEST_BY_PAGE,
//         payload: page,
//     }
// };

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