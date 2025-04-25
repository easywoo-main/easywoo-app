import {MessageType} from "../../../type/chatMessage";


export interface CreateUpdateChatMessageDto {
    parentId?: string;
    name: string;
    files: string[]
    timeout?: number
    sliderProps?: CreateUpdateSliderPropDto
    prevMessageId?: string
    chatId?: string
    type: MessageType;
}

export interface CreateUpdateSliderPropDto {
    name: string;
    type: string;
    chatMessageId: string
}