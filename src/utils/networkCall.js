import { Backend } from '../api'

import axios from "axios";

const networkCall = async (route, method, data) => {
    switch (method) {
        case 'GET':
            try {
                return await axios({
                    method: 'get',
                    url: `${Backend}${route}`,
                })
            } catch (err) {
                console.log(`Error: ${err.message}`);
            }


        case 'POST':
            try {
                return await axios({
                    method: 'post',
                    url: `${Backend}${route}`,
                    data: data
                })
            } catch (err) {
                return err.response
            }


        case 'PUT':
            try {
                return await axios({
                    method: 'put',
                    url: `${Backend}${route}`,
                    data: data
                })
            } catch (err) {
                return err.response;
            }


        case 'DELETE':
            try {
                return await axios({
                    method: 'delete',
                    url: `${Backend}${route}`,
                    data: data
                })
            } catch (err) {
                return err.response;
            }

        default:
            break;

    }
}

const defaultHeaderForToken = (token) => {
    if (token) {
        return axios.defaults.headers.common["Authorization"] = token
    }
}

export { networkCall, defaultHeaderForToken }