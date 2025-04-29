export interface SliderProp {
    name: string;
    id: string;
    type: SliderPropType;
    createdAt: Date;
    updatedAt: Date;
    chatMessageId: string;
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