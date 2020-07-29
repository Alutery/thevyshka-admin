import {createStore}  from 'redux';

import postsReducer from './reducers';

const store = createStore(postsReducer);

export default store;