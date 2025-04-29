import {MessageType} from "../../../type/chatMessage";

export interface TreeNode {
    name: string;
    attributes: any;
    children: TreeNode[];
}

export interface CreateUpdateChatMessageDto {
    parentId?: string;
    name: string;
    files: string[]
    timeout?: number
    sliderProps?: CreateUpdateSliderPropDto[]
    prevMessageId?: string
    prevChoiceId?: string
    chatId?: string
    type: MessageType;
}

export interface CreateUpdateSliderPropDto {
    id?: string;
    name: string;
    type: SliderPropType;
}

export enum SliderPropType {
    NEGATIVE= "NEGATIVE",
    POSITIVE = "POSITIVE",
}

export interface CreateUpdateAnswerDto {
    name: string;
    file?: string;
    prevMessageId?: string;
}