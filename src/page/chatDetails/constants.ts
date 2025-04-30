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
    chatId: undefined,
    isCheckpoint: false
}

export const defaultCreateAnswer: CreateUpdateAnswerDto = {
    name: "",
    file: undefined,
    prevMessageId: undefined,
}

export const nextChoiceMessageTypes: MessageType[] = [MessageType.QUESTION_SINGLE, MessageType.CHALLENGE]