import {MessageChoiceWithRelationDto} from "./messageChoice.type";
import {InfoPopUp, SliderProp} from "./messageSlider.type";

export interface ChatMessage {
    name: string;
    id: string;
    type: MessageType;
    files: string[];
    timeout: bigint;
    nextMessageId: string;
    isCheckpoint: boolean;
    chatId: string
    isAllowManualTime: boolean
    isOfferRestart: boolean
    createdAt: Date;
    updatedAt: Date;
}

export enum MessageType {
    TEXT = 'TEXT',
    FILE = 'FILE',
    CHALLENGE = 'CHALLENGE',
    QUESTION_SINGLE = 'QUESTION_SINGLE',
    QUESTION_TEXT_FIELD = 'QUESTION_TEXT_FIELD',
    QUESTION_SLIDERS = 'QUESTION_SLIDERS',
    GRAPH = 'GRAPH'
}

export interface ChatMessageWithRelations extends ChatMessage {
    nextChoices?: MessageChoiceWithRelationDto[],
    nextMessage?: ChatMessageWithRelations,
    sliderProps?: SliderProp[]
    infoPopUps?: InfoPopUp[];
    stepChatMessages?: any
    prevMessages?: any[]
}
