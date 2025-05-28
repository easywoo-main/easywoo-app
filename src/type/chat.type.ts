import {CreateUpdateSliderPropDto} from "./messageSlider.type";

export type Chat = BaseEntity & ChatDto

export type BaseEntity = {
    readonly id: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}


export type TherapistFormValues = {
    therapistAvatar: string;
    therapistName: string;
}

export type ChatDto = {
    name: string;
    freeSteps: number;
    price: number;
    landingUrl?: string;
    hasIndividualConsultation: boolean;
    isDisabled: boolean;
    paintPoints: string[]
    formula: string;
    masterGraph: string;

    startMessageId: string;
} & TherapistFormValues


export type ChatSliderProps = {
    formula: string;
}

export type SliderCreateUpdateProps = ChatSliderProps & {
    sliderProps: CreateUpdateSliderPropDto[];
}


export type CreateChatDto = Omit<ChatDto, "startMessageId"> & SliderCreateUpdateProps
export type UpdateChatDto = Partial<ChatDto>

