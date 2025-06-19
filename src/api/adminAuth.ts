import {AuthState, Login} from "../type/auth.type";
import apiClientV1 from "../config/axios.config";

export const login = async (auth: Login): Promise<AuthState>=>{
    const { data } = await apiClientV1.post(`/admin-credentials/login`, auth);
    return data;
}

export const refreshToken = async (token: string): Promise<{ accessToken: string }> => {
    const { data } = await apiClientV1.post(`/admin-credentials/refresh`, token);
    return data;
}