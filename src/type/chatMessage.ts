import {MessageChoice} from "./messageChoice.type";

export interface ChatMessage {
    id: string;
    name: string;
    type?: QuestionType;
    nextMessageId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum QuestionType {
    SINGLE = 'SINGLE',
    SLIDER = 'SLIDER',
}

export interface ChatMessageWithRelations extends ChatMessage {
    nextChoices?: MessageChoice[],
    nextMessage?: ChatMessage,
}