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
    therapistAvatar: string;
    therapistName: string;
    graphType: GraphType;
    formula: string;
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
    therapistAvatar: string;
    therapistName: string;
    graphType: GraphType;
    formula: string;
}


export interface ChatWithRelation extends Chat {
    sliderProps: CreateUpdateSliderPropDto[];
}


export enum GraphType {
    LINE = "LINE",
    BAR = "BAR",
    PIE = "PIE",
    DOUGHNUT = "DOUGHNUT",
    RADAR = "RADAR",
    POLAR_AREA = "POLAR_AREA",
    BUBBLE = "BUBBLE",
    SCATTER = "SCATTER",
}
