import {FETCH_TAGS_REQUEST, FETCH_TAGS_SUCCESS, FETCH_TAGS_ERROR} from '../constants/tags-types';

const tagsRequested = () => {
    return {
        type: FETCH_TAGS_REQUEST,
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

export {
    fetchTags,
};