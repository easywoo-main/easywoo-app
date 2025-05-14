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
