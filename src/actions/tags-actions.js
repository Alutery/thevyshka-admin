import {
    FETCH_TAGS_REQUEST,
    FETCH_TAGS_SUCCESS,
    FETCH_TAGS_ERROR,
    FETCH_TAGS_REQUEST_BY_PAGE,
} from '../constants/tags-types';

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

const fetchTags = (dataService, dispatch) => () => {
    dispatch(tagsRequested());
    dataService.getTags()
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