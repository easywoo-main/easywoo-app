import apiClientV1 from "../config/axios.config";
import {MessageChoice, MessageChoiceWithRelationDto} from "../type/messageChoice.type";
import {CreateUpdateAnswerDto} from "../page/chatDetails/type";
import {CreateUpdateAnswerType} from "../schema/createUpdateAnswer.schema";
import {PageRequestArgs, PageResponse} from "../utils/pageable.utils";
import {ChatMessage} from "../type/chatMessage";


export const createMessageChoice = async (data: CreateUpdateAnswerType): Promise<MessageChoice> => {
    const {data: response} = await apiClientV1.post<MessageChoice>(`/message-choice`, data);
    return response;
}

export const updateMessageChoice = async (id: string, data: Partial<CreateUpdateAnswerDto>): Promise<MessageChoice> => {
    const {data: response} = await apiClientV1.patch<MessageChoice>(`/message-choice/${id}`, data);
    return response;
}

export const deleteMessageChoice = async (id: string): Promise<MessageChoice> => {
    const {data: response} = await apiClientV1.delete<MessageChoice>(`/message-choice/${id}`);
    return response;
}

export const getMessageChoiceById = async (id: string): Promise<MessageChoiceWithRelationDto> => {
    const {data} = await apiClientV1.get<MessageChoiceWithRelationDto>(`/message-choice/${id}`);
    return data;
}


export const getAllMessageChoiceByChatMessageId = async (chatMessageId: string, chatId: string, option: PageRequestArgs): Promise<PageResponse<MessageChoice>> => {
    const response = await apiClientV1.get('/message-choice', {
        params: {chatMessageId, chatId, ...option}
    });
    return response.data;
}