import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_REQUEST_BY_PAGE,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_ERROR,
    POST_STATUS_ALL,
    POST_STATUS_PUBLISHED,
    POST_STATUS_DRAFT,
    FETCH_POSTS_REQUEST_BY_STATUS,
    FETCH_POSTS_REQUEST_BY_QUERY,
} from '../constants/posts-types';

import {PAGE_SIZE} from '../constants/common';

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

const postsRequestedByStatus = (page) => {
    return {
        type: FETCH_POSTS_REQUEST_BY_STATUS,
        payload: page,
    }
};

const postsRequestedByQuery = (query) => {
    return {
        type: FETCH_POSTS_REQUEST_BY_QUERY,
        payload: query,
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

const fetchPosts = ({page = 0, query, status} = {}, dataService, dispatch) => {
    dispatch(postsRequestedByPage(page));

    if (query) {
        return _fetchPostsByQuery({page, query}, dataService, dispatch);
    }

    if (status) {
        return _fetchPostsByStatus({page, status}, dataService, dispatch);
    }

    dispatch(postsRequested());
    return dataService.getAllPosts(page * PAGE_SIZE)
        .then(data => dispatch(postsLoaded(data)))
        .catch(error => dispatch(postsError(error)));
};

const _fetchPostsByQuery = ({query, page = 0}, dataService, dispatch) => {
    dispatch(postsRequestedByQuery(query));

    dataService.gatAllPostsByQuery(query, page * PAGE_SIZE)
        .then(data => dispatch(postsLoaded(data)))
        .catch(error => dispatch(postsError(error)));
};

const _fetchPostsByStatus = ({status, page = 0}, dataService, dispatch) => {
    dispatch(postsRequestedByStatus(status));

    let result;
    switch (status) {
        case POST_STATUS_ALL:
            result = dataService.getAllPosts(page * PAGE_SIZE);
            break;
        case POST_STATUS_PUBLISHED:
            result = dataService.getPublishedPosts(page * PAGE_SIZE);
            break;
        case POST_STATUS_DRAFT:
            result = dataService.getDraftPosts(page * PAGE_SIZE);
            break;
        default:
            throw new Error(`Post type "${status}" not exists`);
    }

    return result.then(data => dispatch(postsLoaded(data)))
        .catch(error => dispatch(postsError(error)));
};

export {
    fetchPosts,
};