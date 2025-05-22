export interface SliderProp {
    type: SliderPropType;
    name: string;
    id: string;
    text: string;    positiveMessage: string;
    negativeMessage: string;
    createdAt: Date;
    updatedAt: Date;
    chatId: string;
}

export interface InfoPopUp {
    title: string;
    id: string;
    description?: string;
    chatMessageId: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum SliderPropType{
    NEGATIVE = 'NEGATIVE',
    POSITIVE = 'POSITIVE'
}

export interface CreateUpdateSliderPropDto {
    id?: string
    name: string;
    text: string;
    type: SliderPropType;
    negativeMessage: string;
    positiveMessage: string;
}

export interface  CreateUpdateSliderPropWithRelationDto extends CreateUpdateSliderPropDto{
    chatMessageId: string;
}

