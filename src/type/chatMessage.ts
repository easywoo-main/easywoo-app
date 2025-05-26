import {BaseEntity} from "./chat.type";
import {MessageChoice, MessageChoiceWithRelationDto} from "./messageChoice.type";
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
    timeout?: number;
    type?: MessageType;


    isCourseEnd?: boolean;
    isOfferRestart?: boolean;
    isAllowManualTime?: boolean;
    isComment?: boolean;
    isBarometer?: boolean;

    nextMessageId?: string | null;
    restartMessageId?: string | null;
    chatId: string
}
export type ChatMessage = BaseEntity & ChatMessageDto


export type CreateChatMessageDto = ChatMessageDto & { sliderPropIds: string[] }
export type UpdateChatMessageDto = Partial<CreateChatMessageDto>



export enum MessageType {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
    MEDIA = 'MEDIA',
    GRAPH = 'GRAPH',
    CHALLENGE = "CHALLENGE",
    QUESTION = 'QUESTION',
}

export interface ChatMessageWithRelations extends ChatMessage {
    nextChoices?: MessageChoiceWithRelationDto[],
    nextMessage?: ChatMessageWithRelations,
    sliderProps?: SliderProp[]
    infoPopUps?: InfoPopUp[];
    stepChatMessages?: StepChatMessage[];
    prevMessages?: ChatMessage[]
    prevChoices?: MessageChoice[]
}


export type ChatMessageWithPrevMessage = ChatMessage & {
    prevMessages?: ChatMessage[]
    prevChoices?: MessageChoice[]
};

export interface FilterChatMessage extends PageRequestArgs {
    chatMessageId?: string;
    chatId?: string;
    messageChoiceId?: string;
}