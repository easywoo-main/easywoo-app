export interface MessageChoice   {
    id: string;
    name: string;
    type: ChoiceType;
    prevMessageId: string;
    nextMessageId: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum ChoiceType {
    SINGLE = 'SINGLE',
    MULTIPLE_SLIDER = 'MULTIPLE_SLIDER',
}