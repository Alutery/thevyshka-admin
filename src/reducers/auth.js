import {LOGIN_USER, LOGOUT_USER} from '../constants/auth-types';

const auth = (state, action) => {
    if(state === undefined) {
        return {
            currentUser: null,
        };
    }

    switch (action.type) {
        case LOGIN_USER:
            return {
                currentUser: action.payload,
            };
        case LOGOUT_USER:
            return {
                currentUser: null,
            };
        default:
            return state.auth;
    }
};

export default auth;