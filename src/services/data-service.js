import {POST_STATUS_ALL, POST_STATUS_PUBLISHED, POST_STATUS_DRAFT} from '../constants/posts-types';

export default class DataService {
    getPosts(status, start = 1, number = 15) {
        return fetch(`${process.env.REACT_APP_API_URL}/post/${status}/${start}-${start + number}`)
            .then(response => response.json());
    }

    getAllPosts(start = 1, number = 15) {
        return this.getPosts(POST_STATUS_ALL, start, number);
    }

    getPublishedPosts(start = 1, number = 15) {
        return this.getPosts(POST_STATUS_PUBLISHED, start, number);
    }

    getDraftPosts(start = 1, number = 15) {
        return this.getPosts(POST_STATUS_DRAFT, start, number);
    }

    getTags(start = 1, number = 15) {
        return fetch(`${process.env.REACT_APP_API_URL}/tag/${start}-${start + number}`)
            .then(response => response.json());
    }

    getCollaborators() {
        return fetch(`${process.env.REACT_APP_API_URL}/collab/1-15`)
            .then(response => response.json());
    }
}