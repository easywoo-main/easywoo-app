import {ChatMessage, ChatMessageWithRelations} from "./chatMessage";
import {BaseEntity} from "./chat.type";

type MessageChoiceDto = {
    // name: string;
    text: string;
    infoText?: string;
    goToStep?: number | null
    prevMessageId: string;
    nextMessageId?: string | null;
}

export type MessageChoice = BaseEntity & MessageChoiceDto

export type CreateMessageChoiceDto =  MessageChoiceDto & {id?: string};
export type UpdateMessageChoiceDto =  Partial<CreateMessageChoiceDto>
export type MessageChoiceWithRelationDto = MessageChoice & {
    nextMessage?: ChatMessage ;
}