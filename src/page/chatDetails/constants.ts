import {CreateChatMessageDto} from "../../type/chatMessage";
import {CreateMessageChoiceDto} from "../../type/messageChoice.type";


export const defaultCreateMessage: CreateChatMessageDto = {
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

