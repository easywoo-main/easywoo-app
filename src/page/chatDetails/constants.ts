import {MessageType} from "../../type/chatMessage";
import { CreateUpdateChatMessageDto } from "./type";


export const defaultCreateMessage: CreateUpdateChatMessageDto = {
    type: MessageType.TEXT,
    name: "",
    parentId: undefined,
    files: [],
    timeout: 0,
    sliderProps: undefined,
    prevMessageId: undefined,
    chatId: undefined
}