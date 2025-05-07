export interface SliderProp {
    name: string;
    id: string;
    type: SliderPropType;
    createdAt: Date;
    updatedAt: Date;
    chatMessageId: string;
}

export interface InfoPopUp {
    name: string;
    id: string;
    file: string;
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
    type: SliderPropType;
}

export interface  CreateUpdateSliderPropWithRelationDto extends CreateUpdateSliderPropDto{
    chatMessageId: string;
}