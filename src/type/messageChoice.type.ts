
export interface MessageChoiceEntity   {
    id: string;
    name: string;
    type: ChoiceType;
    prevMessageId: string;
    nextMessageId: string;
    createdAt: Date;
    updatedAt: Date;
}

enum ChoiceType {
    SINGLE = 'SINGLE',
    MULTIPLE_SLIDER = 'MULTIPLE_SLIDER',
}