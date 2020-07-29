import postsList from './posts-list';
import tagsList from './tags-list';

const postsReducer = (state, action) => {
    return {
        postsList: postsList(state, action),
        tagsList: tagsList(state, action),
    };
};

export default postsReducer;