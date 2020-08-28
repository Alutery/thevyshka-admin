import {
    POST_STATUS_ALL,
    POST_STATUS_PUBLISHED,
    POST_STATUS_DRAFT
} from '../constants/posts-types';

export default class DataService {
    dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' })

    _formatDate(dateString) {
        const date = new Date(dateString);
        const [{ value: month },,{ value: day },,{ value: year }] = this.dateTimeFormat.formatToParts(date);

        return `${day}.${month}.${year}`;
    }

    _getPosts(status, start = 1, number = 15) {
        return fetch(`${process.env.REACT_APP_API_URL}/post/${status}/${start}-${start + number}`)
            .then(response => response.json())
            .then(result => {
                result.posts = result.posts.map(post => {
                    post.modifiedDate = this._formatDate(post.modifiedDate);
                    return post;
                });
                return result;
            });
    }

    _gatPostsByQuery(query, start = 1, number = 15) {
        return fetch(`${process.env.REACT_APP_API_URL}/post/search/${encodeURIComponent(query)}/${start}-${start + number}`)
            .then(response => response.json())
            .then(result => {
                result.posts = result.posts.map(post => {
                    post.modifiedDate = this._formatDate(post.modifiedDate);
                    return post;
                });
                return result;
            });
    }

    getAllPosts(start = 1, number = 15) {
        return this._getPosts(POST_STATUS_ALL, start, number);
    }

    gatAllPostsByQuery(query, start = 1, number = 15) {
        return this._gatPostsByQuery(query, start, number);
    }

    getPublishedPosts(start = 1, number = 15) {
        return this._getPosts(POST_STATUS_PUBLISHED, start, number);
    }

    getDraftPosts(start = 1, number = 15) {
        return this._getPosts(POST_STATUS_DRAFT, start, number);
    }

    getTags(start = 1, number = 15) {
        return fetch(`${process.env.REACT_APP_API_URL}/tag/${start}-${start + number}`)
            .then(response => response.json());
    }

    getAllTagsByQuery(query, start = 1, number = 15) {
        if(!query) {
            return this.getTags(start, number);
        }

        return fetch(`${process.env.REACT_APP_API_URL}/tag/search/${encodeURIComponent(query)}/${start}-${start + number}`)
            .then(response => response.json());
    }

    getCollaborators(start = 1, number = 15) {
        return fetch(`${process.env.REACT_APP_API_URL}/collab/${start}-${start + number}`)
            .then(response => response.json())
            .then(result => {
                result.collaborators = result.collaborators.map(collaborator => {
                    collaborator.date = this._formatDate(collaborator.date);
                    return collaborator;
                });
                return result;
            });
    }

    getCollaboratorsByQuery(query, start = 1, number = 15) {
        if(!query) {
            return this.getCollaborators(start, number);
        }

        return fetch(`${process.env.REACT_APP_API_URL}/collab/search/${encodeURIComponent(query)}/${start}-${start + number}`)
            .then(response => response.json())
            .then(result => {
                result.collaborators = result.collaborators.map(collaborator => {
                    collaborator.date = this._formatDate(collaborator.date);
                    return collaborator;
                });
                return result;
            });
    }

    getCategories() {
        return fetch(`${process.env.REACT_APP_API_URL}/category`)
            .then(response => response.json())
    }

    createPost(post) {
        const token = localStorage.token;
        return fetch(`${process.env.REACT_APP_API_URL}/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(post)
        }).then(resp => (!resp.ok)
            ? Promise.reject('Error: ' + resp.status)
            : resp
        ).then(resp => {
            console.log(resp);
        }).catch(error => {
            alert(error);
        });
    }

    _sendTagRequest(tag, method) {
        const token = localStorage.token;
        return fetch(`${process.env.REACT_APP_API_URL}/tag`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(tag)
        }).then(resp => (!resp.ok)
            ? Promise.reject('Error: ' + resp.status)
            : resp
        );
    }

    createTag(tagName) {
        return this._sendTagRequest({name: tagName}, 'POST');
    }

    changeTag(tag) {
        return this._sendTagRequest(tag, 'PUT');
    }

    deleteTag(tagId) {
        const token = localStorage.token;
        return fetch(`${process.env.REACT_APP_API_URL}/tag/${tagId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then(resp => (!resp.ok)
            ? Promise.reject('Error: ' + resp.status)
            : resp
        );
    }

    _sendCollaboratorRequest(collaborator, method) {
        const token = localStorage.token;
        return fetch(`${process.env.REACT_APP_API_URL}/collab`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(collaborator)
        }).then(resp => (!resp.ok)
            ? Promise.reject('Error: ' + resp.status)
            : resp
        );
    }

    createCollaborator(collaborator) {
        return this._sendCollaboratorRequest(collaborator, 'POST');
    }

    editCollaborator(collaborator) {
        return this._sendCollaboratorRequest(collaborator, 'PUT');
    }

    deleteCollaborator(collaboratorId) {
        const token = localStorage.token;
        return fetch(`${process.env.REACT_APP_API_URL}/collab/${collaboratorId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then(resp => (!resp.ok)
            ? Promise.reject('Error: ' + resp.status)
            : resp
        );
    }

    addPhoto(photo) {
        const token = localStorage.token;
        const formData = new FormData();
        formData.append('uploadedFile', photo);

        return fetch(`${process.env.REACT_APP_API_URL}/photo`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        }).then(resp => (!resp.ok)
            ? Promise.reject('Error: ' + resp.status)
            : resp.text()
        );
    }
}