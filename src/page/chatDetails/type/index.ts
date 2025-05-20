import {MessageType} from "../../../type/chatMessage";
import {CreateUpdateInfoPopUpType} from "../../../schema/createUpdateInfoPopUp.schema";
import {CreateUpdateSliderPropType} from "../../../schema/createUpdateSliderProp.schema";

export interface TreeNode {
    name: string;
    attributes: any;
    children: TreeNode[];
}

export interface CreateUpdateChatMessageDto {
    name: string;
    files: string[]
    timeout?: bigint
    infoPopUps?: CreateUpdateInfoPopUpType[]
    prevMessageIds?: string[]
    prevChoiceIds?: string
    nextMessageId?: string | null
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
    NEGATIVE = "NEGATIVE",
    POSITIVE = "POSITIVE",
}

export interface CreateUpdateAnswerDto extends CreateUpdateAnswerFrom {
    prevMessageId?: string;
    nextMessageId?: string | null;
}

export interface CreateUpdateAnswerFrom {
    name: string;
    file?: string;
}

export interface CreateUpdateInfoPopUpDto {
    id: string;
    name: string;
    file?: string;
    chatMessageId: string;
}