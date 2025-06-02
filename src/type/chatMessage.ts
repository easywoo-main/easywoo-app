import {BaseEntity} from "./chat.type";
import {CreateMessageChoiceDto, MessageChoice, MessageChoiceWithRelationDto} from "./messageChoice.type";
import {SliderProp} from "./messageSlider.type";
import {InfoPopUp} from "./infoPopUp.type";
import {PageRequestArgs} from "../utils/pageable.utils";
import {StepChatMessage} from "./stepChatMessage.type";


export type ChatMessageDto = {
    stepName: string;
    introText: string;
    introImages: string[];
    introMedias: string[];
    question: string;
    todoList: string[];
    images: string[];
    medias: string[];
    timeouts: number[];
    type?: MessageType;
    stepId?: number;
    goToStep?: number | null
    restartFrom?: number | null;


    isCourseEnd?: boolean;
    isOfferRestart?: boolean;
    isAllowManualTime?: boolean;
    isComment?: boolean;
    isBarometer?: boolean;
    isGraph?: boolean;

    nextMessageId?: string | null;
    restartMessageId?: string | null;
    sliderPropIds?: string[];
    chatId: string
}

export type ChatMessage = BaseEntity & ChatMessageDto


export type CreateChatMessageDto = ChatMessageDto & {
    answers: (Omit<CreateMessageChoiceDto, "prevMessageId">)[]
}
export type UpdateChatMessageDto = Partial<CreateChatMessageDto>



export enum MessageType {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
    MEDIA = 'MEDIA',
    // GRAPH = 'GRAPH',
    // CHALLENGE = "CHALLENGE",
    // QUESTION = 'QUESTION',
}

export interface ChatMessageWithRelations extends ChatMessageWithChoices {
    // nextMessage?: ChatMessage,
    // restartMessage?: ChatMessage,
    sliderProps?: SliderProp[]
    // infoPopUps?: InfoPopUp[];
    // stepChatMessages?: StepChatMessage[];
    // prevMessages?: ChatMessage[]
    // prevChoices?: MessageChoice[]
}


export type ChatMessageWithChoices = ChatMessage & {
    nextChoices?: MessageChoice[],
};

export interface FilterChatMessage extends PageRequestArgs {
    chatId?: string;
}