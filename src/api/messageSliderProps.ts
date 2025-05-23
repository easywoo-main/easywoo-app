import apiClientV1 from '../config/axios.config';
import {CreateSliderPropWithRelationDto, SliderProp} from "../type/messageSlider.type";

export const createMessageSlider = async (
    data: CreateSliderPropWithRelationDto,
): Promise<SliderProp> => {
    const { data: response } = await apiClientV1.post<SliderProp>('/message-slider', data);
    return response;
};

export const getMessageSliderById = async (id: string): Promise<SliderProp> => {
    const { data: response } = await apiClientV1.get<SliderProp>(`/message-slider/${id}`);
    return response;
};

export const getAllMessageSlidersByMessageId = async (
    chatId: string,
): Promise<SliderProp[]> => {
    const { data: response } = await apiClientV1.get<SliderProp[]>(
        `/message-slider`,
        {params: {chatId}}
    );
    return response;
};

export const updateMessageSlider = async (
    id: string,
    data: Partial<CreateSliderPropWithRelationDto>,
): Promise<SliderProp> => {
    const { data: response } = await apiClientV1.patch<SliderProp>(`/message-slider/${id}`, data);
    return response;
};

export const deleteMessageSlider = async (id: string): Promise<SliderProp> => {
    const { data: response } = await apiClientV1.delete<SliderProp>(`/message-slider/${id}`);
    return response;
};