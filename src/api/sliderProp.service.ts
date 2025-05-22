import apiClientV1 from "../config/axios.config";
import {SliderProp} from "../type/messageSlider.type";


export const getAllSliderPropsByChatId = async  (chatId: string): Promise<SliderProp[]> => {
    const {data} = await apiClientV1.get(`/slider-prop`, {
        params: {chatId},
    })
    return data;
}