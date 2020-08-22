import {LOGIN_USER, LOGOUT_USER} from '../constants/auth-types';

const loginUser = userObj => ({
    type: LOGIN_USER,
    payload: userObj
});

const logoutUser = () => ({
    type: LOGOUT_USER
});

const getProfile = (token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/myself`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(resp => (!resp.ok)
        ? Promise.reject('Error: ' + resp.status)
        : resp.json()
    ).then(user => ({
        'name': user.name,
        'surname': user.surname
    }));
};

const userLoginFetch = (user, onError) => {
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then(resp => (!resp.ok)
            ? Promise.reject('Error: ' + resp.status)
            : resp.text()
        ).then(jwt => {
            localStorage.setItem('token', jwt);

            getProfile(jwt)
                .then(user => {
                    console.log(user)
                    dispatch(loginUser(user))
                })
                .catch(() => {
                    localStorage.removeItem('token')
                });
        }).catch(error => {
            alert('Ошибка авторизации' + error);
            onError();
        });
    };
};

const getProfileFetch = () => {
    return dispatch => {
        const token = localStorage.token;
        if (token) {
            return getProfile(token)
                .then(user => {
                    dispatch(loginUser(user))
                })
                .catch(() => {
                    localStorage.removeItem("token")
                });
        }
    }
};

export {
    userLoginFetch,
    getProfileFetch,
    logoutUser,
};