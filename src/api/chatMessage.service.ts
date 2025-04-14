import apiClientV1 from "../config/axios.config";
import {ChatMessage, ChatMessageWithRelations} from "../type/chatMessage";

export const getChatMessageById = async (chatId: string): Promise<ChatMessageWithRelations> => {
    const response = await apiClientV1.get(`/chat-message/${chatId}`);
    return response.data;
}

export const createChatMessage = async (data: any): Promise<ChatMessage> => {
    const response = await apiClientV1.post(`/api/v1/chat-message`, data);
    return response.data;
}

export const updateChatMessage = async (chatId: string, data: any): Promise<ChatMessage> => {
    const response = await apiClientV1.put(`/chat-message/${chatId}`, data);
    return response.data;
}

export const deleteChatMessage = async (chatId: string): Promise<ChatMessage> => {
    const response = await apiClientV1.delete(`/chat-message/${chatId}`);
    return response.data;
}