import {PageRequestArgs, PageResponse} from "../utils/pageable.utils";
import apiClientV1 from "../config/axios.config";
import {ResultMessageChoice} from "../type/resultMessageChoice.type";

export const getPaginationResultMessageChoice = async (messageChoiceId: string, option: PageRequestArgs):  Promise<PageResponse<ResultMessageChoice>> => {
    const {data} = await apiClientV1.get(`/result-message-choice/${messageChoiceId}`, {
        params: option,
    })
    return data;
}