import apiClientV1 from "../config/axios.config";
import {MessageChoice} from "../type/messageChoice.type";


export const createMessageChoice = async (data: MessageChoice): Promise<MessageChoice> => {
    const {data: response} = await apiClientV1.post<MessageChoice>(`/message-choice`, data);
    return response;
}

export const updateMessageChoice = async (id: string, data: MessageChoice): Promise<MessageChoice> => {
    const {data: response} = await apiClientV1.patch<MessageChoice>(`/message-choice/${id}`, data);
    return response;
}

export const deleteMessageChoice = async (id: string): Promise<MessageChoice> => {
    const {data: response} = await apiClientV1.delete<MessageChoice>(`/message-choice/${id}`);
    return response;
}

export const getMessageChoiceById = async (id: string): Promise<MessageChoice> => {
    const {data} = await apiClientV1.get<MessageChoice>(`/message-choice/${id}`);
    return data;
}