import apiClientV1 from '../config/axios.config';
import {CreateUpdateSliderPropWithRelationDto, SliderProp} from "../type/messageSlider.type";

export const createMessageSlider = async (
    data: CreateUpdateSliderPropWithRelationDto,
): Promise<SliderProp> => {
    const { data: response } = await apiClientV1.post<SliderProp>('/message-slider', data);
    return response;
};

export const getMessageSliderById = async (id: string): Promise<SliderProp> => {
    const { data: response } = await apiClientV1.get<SliderProp>(`/message-slider/${id}`);
    return response;
};

export const getAllMessageSlidersByMessageId = async (
    chatMessageId: string,
): Promise<SliderProp[]> => {
    const { data: response } = await apiClientV1.get<SliderProp[]>(
        `/message-slider/message/${chatMessageId}`,
    );
    return response;
};

export const updateMessageSlider = async (
    id: string,
    data: Partial<CreateUpdateSliderPropWithRelationDto>,
): Promise<SliderProp> => {
    const { data: response } = await apiClientV1.patch<SliderProp>(`/message-slider/${id}`, data);
    return response;
};

export const deleteMessageSlider = async (id: string): Promise<SliderProp> => {
    const { data: response } = await apiClientV1.delete<SliderProp>(`/message-slider/${id}`);
    return response;
};