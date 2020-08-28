import {
    CREATE_AUTHOR_SHOW_MODAL,
    DETAILED_AUTHOR_SHOW_MODAL,
    EDIT_AUTHOR_SHOW_MODAL,
    HIDE_MODAL
} from '../constants/author-modal-types';

const authorModal = (state, action) => {
    if(state === undefined) {
        return {
            open: false,
            isNew: null,
            collaborator: null,
            editable: false,
        };
    }

    switch (action.type) {
        case CREATE_AUTHOR_SHOW_MODAL:
            return {
                open: true,
                isNew: true,
                collaborator: null,
                editable: true,
            };
        case EDIT_AUTHOR_SHOW_MODAL:
            return {
                open: true,
                isNew: false,
                collaborator: action.payload,
                editable: true,
            };
        case DETAILED_AUTHOR_SHOW_MODAL:
            return {
                open: true,
                isNew: false,
                collaborator: action.payload,
                editable: false,
            };
        case HIDE_MODAL:
            return {
                open: false,
                isNew: null,
                collaborator: null,
                editable: false,
            };
        default:
            return state.authorModal;
    }
};

export default authorModal;