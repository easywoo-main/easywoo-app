import {MessageChoice} from "./messageChoice.type";

export interface ChatMessage {
    name: string;
    id: string;
    type: MessageType;
    files: string[];
    timeout: number;
    nextMessageId: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum MessageType {
    TEXT = 'TEXT',
    FILE = 'FILE',
    CHALLENGE = 'CHALLENGE',
    QUESTION_SINGLE = 'QUESTION_SINGLE',
    QUESTION_TEXT_FIELD = 'QUESTION_TEXT_FIELD',
    QUESTION_SLIDERS = 'QUESTION_SLIDERS'
}

export interface ChatMessageWithRelations extends ChatMessage {
    nextChoices?: MessageChoice[],
    nextMessage?: ChatMessage,
    sliderProps?: SliderProp[]
}

enum SliderPropType {
    NEGATIVE = 'NEGATIVE',
    POSITIVE = 'POSITIVE'
}

export interface SliderProp {
    id: string;
    name: string;
    type: SliderPropType;
    createdAt: Date;
    updatedAt: Date;
    chatMessageId: string;
}