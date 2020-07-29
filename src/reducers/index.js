import postsList from './posts-list';
import tagsList from './tags-list';
import collaboratorsList from './collaborators-list';

const postsReducer = (state, action) => {
    return {
        postsList: postsList(state, action),
        tagsList: tagsList(state, action),
        collaboratorsList: collaboratorsList(state, action),
    };
};

export default postsReducer;