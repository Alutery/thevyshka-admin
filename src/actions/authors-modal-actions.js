import {
    CREATE_AUTHOR_SHOW_MODAL,
    EDIT_AUTHOR_SHOW_MODAL,
    DETAILED_AUTHOR_SHOW_MODAL,
    HIDE_MODAL
} from '../constants/author-modal-types';

const hideModal = (dispatch) => {
    dispatch({
        type: HIDE_MODAL,
    });
};

const createAuthorShowModal = (dispatch) => {
    dispatch({
        type: CREATE_AUTHOR_SHOW_MODAL,
    });
};

const editAuthorShowModal = (collaborator, dispatch) => {
    dispatch({
        type: EDIT_AUTHOR_SHOW_MODAL,
        payload: collaborator,
    });
};

const detailedAuthorShowModal = (collaborator, dispatch) => {
    dispatch({
        type: DETAILED_AUTHOR_SHOW_MODAL,
        payload: collaborator,
    });
};

export {
    hideModal,
    createAuthorShowModal,
    editAuthorShowModal,
    detailedAuthorShowModal,
};