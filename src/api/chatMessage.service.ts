import apiClientV1 from "../config/axios.config";
import {ChatMessage, ChatMessageWithRelations} from "../type/chatMessage";
import {CreateUpdateChatMessageDto} from "../page/chatDetails/type";

export const getChatMessageById = async (chatId: string): Promise<ChatMessageWithRelations> => {
    const response = await apiClientV1.get(`/chat-message/${chatId}`);
    return response.data;
}

export const createChatMessage = async (data: CreateUpdateChatMessageDto): Promise<ChatMessage> => {
    const response = await apiClientV1.post(`/chat-message`, data);
    return response.data;
}

export const updateChatMessage = async (chatMessageId: string, data: CreateUpdateChatMessageDto): Promise<ChatMessage> => {
    const response = await apiClientV1.patch(`/chat-message/${chatMessageId}`, data);
    return response.data;
}

export const deleteChatMessage = async (chatMessageId: string): Promise<ChatMessage> => {
    const response = await apiClientV1.delete(`/chat-message/${chatMessageId}`);
    return response.data;
}

export const uploadFiles = async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('files', file);
    });

    const response = await apiClientV1.post('/storage/chat-message', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}