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
    timeout?: bigint
    sliderProps?: CreateUpdateSliderPropDto[]
    prevMessageId?: string
    prevChoiceId?: string
    chatId?: string
    type: MessageType;
    isCheckpoint: boolean;
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

export interface CreateUpdateAnswerDto extends CreateUpdateAnswerFrom{
    prevMessageId?: string;
}

export interface CreateUpdateAnswerFrom {
    name: string;
    file?: string;
}