import apiClientV1 from "../config/axios.config";

export const getChatMessageById = async (chatId: string) => {
    const response = await apiClientV1.get(`/chat-message/${chatId}`);
    return response.data;
}

export const createChatMessage = async (data: any) => {
    const response = await apiClientV1.post(`/api/v1/chat-message`, data);
    return response.data;
}

export const updateChatMessage = async (chatId: string, data: any) => {
    const response = await apiClientV1.put(`/chat-message/${chatId}`, data);
    return response.data;
}