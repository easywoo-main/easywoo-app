import {CreateUpdateSliderPropDto} from "./messageSlider.type";

export interface Chat {
    id: string;
    name: string;
    freeSteps: number;
    price: number;
    landingUrl: string;
    hasIndividualConsultation: boolean;
    isDisabled: boolean;
    startMessageId: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface CreateUpdateChatDto {
    name: string;
    price: number;
    freeSteps: number;
    landingUrl?: string;
    hasIndividualConsultation: boolean;
    isDisabled: boolean;
    sliderProps: CreateUpdateSliderPropDto[];
}


export interface ChatWithRelation extends Chat {
    sliderProps: CreateUpdateSliderPropDto[];

}