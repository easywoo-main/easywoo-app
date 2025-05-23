import {ChatMessageWithRelations} from "./chatMessage";
import {BaseEntity} from "./chat.type";

type MessageChoiceDto = {
    name: string;
    text: string;
    file?: string;
    prevMessageId: string;
    nextMessageId?: string;
}

export type MessageChoice = BaseEntity & MessageChoiceDto

export type CreateMessageChoiceDto =  MessageChoiceDto
export type UpdateMessageChoiceDto =  Partial<CreateMessageChoiceDto>
export type MessageChoiceWithRelationDto = MessageChoice & {
    nextMessage?: ChatMessageWithRelations ;
}