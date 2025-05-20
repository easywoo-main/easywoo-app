import {MessageType} from "../../type/chatMessage";
import {CreateUpdateAnswerDto} from "./type";
import {CreateUpdateMessageType} from "../../schema/createUpdateMessage.schema";


export const defaultCreateMessage: CreateUpdateMessageType = {
    type: MessageType.TEXT,
    name: "",
    files: [],
    timeout: undefined,
    infoPopUps: [],
    isCheckpoint: false,
    isAllowManualTime: false,
    isOfferRestart: false,
}

export const defaultCreateAnswer: CreateUpdateAnswerDto = {
    name: "",
    file: undefined,
    prevMessageId: undefined,
}

export const nextChoiceMessageTypes: MessageType[] = [MessageType.QUESTION_SINGLE, MessageType.CHALLENGE]