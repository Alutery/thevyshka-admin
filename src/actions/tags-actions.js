import {
    FETCH_TAGS_REQUEST,
    FETCH_TAGS_SUCCESS,
    FETCH_TAGS_ERROR,
    FETCH_TAGS_REQUEST_BY_PAGE,
    FETCH_TAGS_REQUEST_BY_QUERY,
} from '../constants/tags-types';

import {PAGE_SIZE} from '../constants/common';

const tagsRequested = () => {
    return {
        type: FETCH_TAGS_REQUEST,
    };
};

const tagsRequestedByPage = (page) => {
    return {
        type: FETCH_TAGS_REQUEST_BY_PAGE,
        payload: page,
    };
};

const postsRequestedByQuery = (query) => {
    return {
        type: FETCH_TAGS_REQUEST_BY_QUERY,
        payload: query,
    }
};

const tagsLoaded = (posts) => {
    return {
        type: FETCH_TAGS_SUCCESS,
        payload: posts,
    };
};

const tagsError = (error) => {
    return {
        type: FETCH_TAGS_ERROR,
        payload: error,
    };
};

const fetchTags = ({page = 0, query} = {}, dataService, dispatch) => {
    if(query) {
        return _fetchTagsByQuery({page, query}, dataService, dispatch);
    }

    dispatch(tagsRequestedByPage(page));
    return dataService.getTags(page * PAGE_SIZE)
        .then(data => dispatch(tagsLoaded(data)))
        .catch(error => dispatch(tagsError(error)));
};

const _fetchTagsByQuery = ({page = 0, query}, dataService, dispatch) => {
    dispatch(postsRequestedByQuery(query));

    return dataService.getAllTagsByQuery(query, page * PAGE_SIZE)
        .then(data => dispatch(tagsLoaded(data)))
        .catch(error => dispatch(tagsError(error)));
};

const fetchTagsByPage = (page, dataService, dispatch) => {
    dispatch(tagsRequestedByPage(page));
    dataService.getTags(page * 15)
        .then(data => dispatch(tagsLoaded(data)))
        .catch(error => dispatch(tagsError(error)));
};

const searchTags = (query, dataService, dispatch) => {
    dispatch(tagsRequested());
    dataService.getTags()
        .then(data => dispatch(tagsLoaded(data)))
        .catch(error => dispatch(tagsError(error)));
}

export {
    fetchTags,
    fetchTagsByPage,
    searchTags,
};