import apiClientV1 from "../config/axios.config";
import {Role} from "../type/role.type";

export const getAllRoles = async (): Promise<Role[]> => {
    const { data } = await apiClientV1.get(`/role`);
    return data;
}