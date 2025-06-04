import {ChatMessageWithRelations, CreateChatMessageDto} from "../type/chatMessage";


export const entityToDto = (entity: ChatMessageWithRelations): CreateChatMessageDto =>{
    return {
        stepName: entity.stepName,
        introText: entity.introText || '',
        introImages: entity.introImages || [],
        introMedias: entity.introMedias || [],
        question: entity.question || '',
        todoList: entity.todoList || [],
        images: entity.images || [],
        medias: entity.medias || [],
        timeouts: entity.timeouts,
        type: entity.type,
        isCourseEnd: entity.isCourseEnd,
        isOfferRestart: entity.isOfferRestart,
        isAllowManualTime: entity.isAllowManualTime,
        isComment: entity.isComment,
        isGraph: entity.isGraph,
        isBarometer: entity.isBarometer,
        stepId: entity.stepId,
        restartFrom: entity?.restartFrom,
        nextMessageId: entity.nextMessageId,
        restartMessageId: entity.restartMessageId,
        chatId: entity.chatId,
        goToStep: entity?.goToStep,
        sliderPropIds: entity?.sliderProps?.map((item: { id: string }) => item.id) || [],
        answers: entity.nextChoices?.map((item) => ({
            id: item.id, text: item.text, infoText: item.infoText, goToStep: item.goToStep, nextMessageId: item.nextMessageId, file: item.file
        })) || [],
    }
}