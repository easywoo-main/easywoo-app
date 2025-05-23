import {BaseEntity} from "./chat.type";
type InfoPopUpDto = {
    title: string;
    description?: string;
    chatMessageId: string;
}
export type InfoPopUp = BaseEntity & InfoPopUpDto
