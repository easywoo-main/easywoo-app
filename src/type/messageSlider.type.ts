export interface SliderProp {
    name: string;
    id: string;
    type: SliderPropType;
    text: string;
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
}

export interface  CreateUpdateSliderPropWithRelationDto extends CreateUpdateSliderPropDto{
    chatMessageId: string;
}