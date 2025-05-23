import {CreateChatMessageDto, MessageType} from "../../type/chatMessage";
import {CreateMessageChoiceDto} from "../../type/messageChoice.type";


export const defaultCreateMessage: CreateChatMessageDto = {
    introText: "",
    question: "",
    chatId: "",
    type: MessageType.TEXT,
    name: "",
    files: [],
    timeout: undefined,
    infoPopUps: [],
    isCheckpoint: false,
    isAllowManualTime: false,
    isOfferRestart: false,
    isCourseEnd: false,
    step: "",
    stepName: "",
    isComment: false,
    isBarometer: false

}

export const defaultCreateAnswer: CreateMessageChoiceDto = {
    name: "",
    text: "",
    prevMessageId: "",
}

export const nextChoiceMessageTypes: MessageType[] = [MessageType.QUESTION_SINGLE, MessageType.CHALLENGE]