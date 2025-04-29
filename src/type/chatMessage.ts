import { MessageChoiceWithRelationDto} from "./messageChoice.type";
import {SliderProp} from "./messageSlider.type";

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
    nextChoices?: MessageChoiceWithRelationDto[],
    nextMessage?: ChatMessage,
    sliderProps?: SliderProp[]
}
