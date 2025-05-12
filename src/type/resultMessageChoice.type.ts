import { User } from "./user.type";

export interface ResultMessageChoice {
    id: string;
    userId: string;
    messageChoiceId: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}