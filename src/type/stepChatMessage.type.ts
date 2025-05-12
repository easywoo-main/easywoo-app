import {User} from "./user.type";

export interface StepChatMessage {
    id: string;
    userId: string;
    chatMessageId: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}