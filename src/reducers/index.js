import postsList from './posts-list';
import tagsList from './tags-list';
import collaboratorsList from './collaborators-list';
import authorModal from './author-modal';
import auth from './auth';

const reducer = (state, action) => {
    return {
        postsList: postsList(state, action),
        tagsList: tagsList(state, action),
        collaboratorsList: collaboratorsList(state, action),
        authorModal: authorModal(state, action),
        auth: auth(state, action),
    };
};

export default reducer;