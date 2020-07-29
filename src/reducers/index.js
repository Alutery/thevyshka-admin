import postsList from './posts-list';

const postsReducer = (state, action) => {
    return {
        postsList: postsList(state, action),
    };
};

export default postsReducer;