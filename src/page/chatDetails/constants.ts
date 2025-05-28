import {CreateChatMessageDto} from "../../type/chatMessage";
import {CreateMessageChoiceDto} from "../../type/messageChoice.type";


export const defaultCreateMessage: CreateChatMessageDto = {
    answers: [],
    goToStep: undefined,
    stepId: undefined,
    chatId: "",
    images: [],
    introImages: [],
    introMedias: [],
    introText: "",
    medias: [],
    question: "",
    sliderPropIds: [],
    stepName: "",
    todoList: [],
    timeouts: []
}

export const defaultCreateAnswer: CreateMessageChoiceDto = {
    // name: "",
    text: "",
    prevMessageId: "",
}

