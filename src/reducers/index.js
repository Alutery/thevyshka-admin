import postsList from './posts-list';
import tagsList from './tags-list';
import collaboratorsList from './collaborators-list';
import modal from './modal';

const reducer = (state, action) => {
    return {
        postsList: postsList(state, action),
        tagsList: tagsList(state, action),
        collaboratorsList: collaboratorsList(state, action),
        modal: modal(state, action),
    };
};

export default reducer;