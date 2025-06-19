import {PageRequestArgs, PageResponse} from "../utils/pageable.utils";
import apiClientV1 from "../config/axios.config";
import {Admin, CreateAdminDto, UpdateAdminDto} from "../type/auth.type";

export const getAllAdmins = async (option: PageRequestArgs): Promise<PageResponse<Admin>> => {
    const {data} = await apiClientV1.get("/admin", {
    });
    return data;
}

export const getAdminById = async (id: string): Promise<Admin> => {
    const {data} = await apiClientV1.get(`/admin/${id}`);
    return data;
}

export const createAdmin = async (createAdminDto: CreateAdminDto): Promise<Admin> => {
    const {data} = await apiClientV1.post(`/admin`, createAdminDto);
    return data;
}

export const deleteAdmin = async (id: string): Promise<Admin> => {
    const {data} = await apiClientV1.delete(`/admin/${id}`);
    return data;
}

export const updateAdmin = async (id: string, updateAdminDto: UpdateAdminDto): Promise<Admin> => {
    const {data} = await apiClientV1.patch(`/admin/${id}`, updateAdminDto);
    return data
}