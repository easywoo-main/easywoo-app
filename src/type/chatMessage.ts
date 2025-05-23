import {BaseEntity} from "./chat.type";
import {MessageChoice, MessageChoiceWithRelationDto} from "./messageChoice.type";
import {SliderProp} from "./messageSlider.type";
import {InfoPopUp} from "./infoPopUp.type";
import {CreateUpdateInfoPopUpType} from "../schema/createUpdateInfoPopUp.schema";
import {PageRequestArgs} from "../utils/pageable.utils";
import {StepChatMessage} from "./stepChatMessage.type";


export type ChatMessageDto = {
    name: string;
    type: MessageType;
    files: string[];
    timeout?: bigint;
    isCheckpoint: boolean;
    isAllowManualTime: boolean
    isOfferRestart: boolean

    isCourseEnd: boolean
    isComment: boolean,
    isBarometer: boolean,

    step: string;
    stepName: string;
    question: string;
    introText: string;

    nextMessageId?: string | null;
    chatId: string
}
export type ChatMessage = BaseEntity & ChatMessageDto


export type CreateChatMessageDto = ChatMessageDto & {infoPopUps: CreateUpdateInfoPopUpType[]}
export type UpdateChatMessageDto = Partial<CreateChatMessageDto>



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