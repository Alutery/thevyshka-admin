import {SHOW_MODAL, HIDE_MODAL} from '../constants/common';

const hideModal = (dispatch)  => {
    dispatch({type: HIDE_MODAL});
};

const showModal = (dispatch)  => {
    dispatch({type: SHOW_MODAL});
};

export {
    hideModal,
    showModal,
};