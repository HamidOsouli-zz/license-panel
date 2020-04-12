import axios from 'axios';
class HttpService {
    constructor() {
        axios.defaults.timeout = 50000;
        axios.interceptors.request.use(
            (config) => {
                const token = JSON.parse(localStorage.getItem("access_token"));
                config.timeout = 60000;
                if (token) {
                    config.headers["Authorization"] = "Bearer " + token;
                }
                return config;
            }, (error) => {
                return Promise.reject(error);
            }
        );

        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response && error.response.status === 401) {
                    localStorage.removeItem("access_token");
                }
                return Promise.reject({error});
            }
        );
    }

    get(url, config) {
        return axios.get(url, config);
    }

    post(url, data, config) {
        config = config || { headers: { 'content-type': 'application/json' }};
        return axios.post(url, data, config);
    }

    put(url, data, config) {
        config = config || { headers: { 'content-type': 'application/json' }};
        return axios.put(url, data, config);
    }

    delete(url, data, config) {
        config = config || { headers: { 'content-type': 'application/json' }};
        return axios.delete(url, config);
    }
}

export default new HttpService();
