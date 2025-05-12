import {PageRequestArgs, PageResponse} from "../utils/pageable.utils";
import apiClientV1 from "../config/axios.config";
import {StepChatMessage} from "../type/stepChatMessage.type";


export const getPaginationStepChatMessage = async (chatMessageId: string, option: PageRequestArgs): Promise<PageResponse<StepChatMessage>> => {
    const {data} = await apiClientV1.get(`/step-chat-message/${chatMessageId}`, {
        params: option,
    })
    return data;
}