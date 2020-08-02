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
            .then(response => response.json());
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
}