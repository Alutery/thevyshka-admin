export default class DataService {
    getPosts() {
        return fetch(`${process.env.REACT_APP_API_URL}/post/all/1-15`)
            .then(response => response.json());
    }

    getTags() {
        return fetch(`${process.env.REACT_APP_API_URL}/tag/1-15`)
            .then(response => response.json());
    }

    getCollaborators() {
        return fetch(`${process.env.REACT_APP_API_URL}/collab/1-15`)
            .then(response => response.json());
    }
}