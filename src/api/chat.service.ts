import apiClientV1 from "../config/axios.config";
import {PageRequestArgs, PageResponse} from "../utils/pageable.utils";
import {Chat} from "../type/chat.type";

export const getPaginationChat = async (option: PageRequestArgs): Promise<PageResponse<Chat>> => {
    console.log("option",option);
    const { data } = await apiClientV1.get("/chat", {
        params: option,
    });
    return data;
}

export const getChatById = async (id: string): Promise<Chat> => {
    const { data } = await apiClientV1.get(`/chat/${id}`);
    return data;
}

export const createChat = async (payload: Chat): Promise<Chat> => {
    const { data } = await apiClientV1.post("/chat", payload);
    return data;
}

export const updateChat = async (id: string, payload: Chat): Promise<Chat> => {
    const { data } = await apiClientV1.patch(`/chat/${id}`, payload);
    return data;
}

export const deleteChat = async (id: string): Promise<Chat> => {
    const { data } = await apiClientV1.delete(`/chat/${id}`);
    return data;
}