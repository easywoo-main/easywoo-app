import axios from 'axios';

import { jwtDecode } from 'jwt-decode';
import {refreshToken as fetchNewAccessToken} from "../api/adminAuth";


const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.exp * 1000 < Date.now();
    } catch (e) {
        return true;
    }
};

type JwtPayload = {
    exp: number;
};


const createApiClient = (version: "v1"|"v2")=>{
    const apiClient = axios.create({
        baseURL: `${process.env.REACT_APP_API_URL}/api/${version}`,
        headers: {
            'Content-Type': 'application/json',
        },
    })


    apiClient.interceptors.request.use(async (config) => {
        let token = localStorage.getItem('accessToken');
        const refresh = localStorage.getItem('refreshToken');
        console.log("token", token);
        if (token) {
            if (isTokenExpired(token) && refresh) {
                try {
                    localStorage.removeItem('accessToken');
                    const { accessToken: newAccessToken } = await fetchNewAccessToken(refresh);
                    token = newAccessToken;
                    localStorage.setItem('accessToken', newAccessToken);
                } catch (error) {
                    console.error('Failed to refresh token', error);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                    return Promise.reject(error);
                }
            }

            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    });

    apiClient.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response) {
                if (error.response.status === 401) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                } else {
                    console.error(
                        `Error: ${error.response.status} - ${
                            error.response.data.message || error.response.statusText
                        }`
                    );
                }
            } else if (error.request) {
                console.error('No response received from server.');
            } else {
                console.error(`Request error: ${error.message}`);
            }

            return Promise.reject(error);
        }
    );

    return apiClient


}

const apiClientV1 = createApiClient("v1");
const apiClientV2 = createApiClient("v2")

export default apiClientV1;
export {apiClientV1, apiClientV2}

