import {MessageType} from "../../type/chatMessage";
import {CreateUpdateAnswerDto, CreateUpdateChatMessageDto} from "./type";


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

export const defaultCreateAnswer: CreateUpdateAnswerDto = {
    name: "",
    file: undefined,
    prevMessageId: undefined,
}