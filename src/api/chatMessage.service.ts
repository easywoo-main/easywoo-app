import apiClientV1 from "../config/axios.config";
import {ChatMessage, ChatMessageWithRelations} from "../type/chatMessage";
import {CreateUpdateChatMessageDto} from "../page/chatDetails/type";
import {PageRequestArgs, PageResponse} from "../utils/pageable.utils";

export const getChatMessageById = async (chatId: string, userIds?: string[]): Promise<ChatMessageWithRelations> => {
    const response = await apiClientV1.get(`/chat-message/${chatId}`, {
        params: {userIds: userIds}
    });
    return response.data;
}

export const createChatMessage = async (data: CreateUpdateChatMessageDto): Promise<ChatMessage> => {
    const response = await apiClientV1.post(`/chat-message`, data);
    return response.data;
}

export const updateChatMessage = async (chatMessageId: string, data: Partial<CreateUpdateChatMessageDto>): Promise<ChatMessage> => {
    const response = await apiClientV1.patch(`/chat-message/${chatMessageId}`, data);
    return response.data;
}

export const deleteChatMessage = async (chatMessageId: string): Promise<ChatMessage> => {
    const response = await apiClientV1.delete(`/chat-message/${chatMessageId}`);
    return response.data;
}

export const uploadFiles = async (files: File[], folder?: string): Promise<string[]> => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('files', file);
    });

    const response = await apiClientV1.post('/storage/chat-message', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        params: {
            folder,
        }
    });
    return response.data;
}

export const getAllByChatMessageId = async (chatMessageId: string, chatId: string, option: PageRequestArgs): Promise<PageResponse<ChatMessage>> => {
    const response = await apiClientV1.get('/chat-message', {
        params: {chatMessageId, chatId, ...option}
    });
    return response.data;
}