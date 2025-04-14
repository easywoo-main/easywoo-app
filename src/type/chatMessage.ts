import {MessageChoice} from "./messageChoice.type";

export interface ChatMessageType {
    id: string;
    name: string;
    type: MessageType;
    nextMessageId: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum MessageType {
    SINGLE = 'SINGLE',
    SLIDER = 'SLIDER',
}

export interface ChatMessageWithRelations extends ChatMessageType {
    nextChoices?: MessageChoice[]
}