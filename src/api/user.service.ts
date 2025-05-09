import apiClientV1 from "../config/axios.config";
import {PageRequestArgs, PageResponse} from "../utils/pageable.utils";
import {User} from "../type/user.type";


export const getPaginationUser = async (chatId: string, option: PageRequestArgs): Promise<PageResponse<User>> => {
    const { data } = await apiClientV1.get(`/user/chat/${chatId}`, {
        params: option,
    });
    return data;
}