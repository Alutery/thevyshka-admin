import {SHOW_MODAL, HIDE_MODAL} from '../constants/common';

const modal = (state, action) => {
    if(state === undefined) {
        return {
            open: false,
        };
    }

    switch (action.type) {
        case SHOW_MODAL:
            return {
                open: true,
            };
        case HIDE_MODAL:
            return {
                open: false,
            };
        default:
            return state.modal;
    }
};

export default modal;