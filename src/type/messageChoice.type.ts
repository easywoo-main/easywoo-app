import {ChatMessageWithRelations} from "./chatMessage";

export interface MessageChoice   {
    id: string;
    name: string;
    type: ChoiceType;
    prevMessageId: string;
    nextMessageId: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum ChoiceType {
    SINGLE = 'SINGLE',
    MULTIPLE_SLIDER = 'MULTIPLE_SLIDER',
}

export interface MessageChoiceWithRelationDto extends MessageChoice {
    nextMessage: ChatMessageWithRelations | null;
}