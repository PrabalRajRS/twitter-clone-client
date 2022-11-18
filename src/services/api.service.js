import axios from 'axios';

export const PostApi = (url, data) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
            .then(response => {
                resolve(response);
            })
            .catch(e => {
                reject(e.response);
            });
    });
};

export const PutApi = (url, data) => {
    return new Promise((resolve, reject) => {
        axios
            .patch(url, data)
            .then(response => {
                resolve(response.data);
            })
            .catch(e => {
                reject(e.response.data);
            });
    });
};

export const GetApi = (url) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then(response => {
                resolve(response.data);
            })
            .catch(e => {
                reject(e.response.data);
            });
    });
};

export const DeleteApi = (url, data) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(url, data)
            .then(response => {
                resolve(response.data);
            })
            .catch(e => {
                reject(e.response.data);
            });
    });
};
