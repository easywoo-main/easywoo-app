import apiClientV1 from "../config/axios.config";
import {
    ChatMessage, ChatMessageWithPrevMessage,
    ChatMessageWithRelations,
    CreateChatMessageDto,
    FilterChatMessage,
    UpdateChatMessageDto
} from "../type/chatMessage";
import {PageRequestArgs, PageResponse} from "../utils/pageable.utils";

export const getChatMessageById = async (chatId: string, userIds?: string[]): Promise<ChatMessageWithRelations> => {
    const response = await apiClientV1.get(`/chat-message/${chatId}`, {
        params: {userIds: userIds}
    });
    return response.data;
}

export const createChatMessage = async (data: CreateChatMessageDto): Promise<ChatMessage> => {
    const response = await apiClientV1.post(`/chat-message`, data);
    return response.data;
}

export const updateChatMessage = async (chatMessageId: string, data: UpdateChatMessageDto): Promise<ChatMessage> => {
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

export const getAllByChatMessageId = async (option: FilterChatMessage): Promise<PageResponse<ChatMessageWithPrevMessage>> => {
    const response = await apiClientV1.get('/chat-message', {
        params: option
    });
    return response.data;
}