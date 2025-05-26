import * as Yup from "yup";
import {MessageType} from "../type/chatMessage";

export const createUpdateMessageSchema = Yup.object().shape({
    stepName: Yup.string().required("Message text cannot be empty."),
    introText: Yup.string().required("Message text cannot be empty"),
    introImages: Yup.array().of(Yup.string().required("Images cannot be empty.")),
    introMedias: Yup.array().of(Yup.string().required("Media cannot be empty.")),
    question: Yup.string().required("Message text cannot be empty."),
    todoList:  Yup.array().of(Yup.string().required("Todo Item must be required")),
    images: Yup.array().of(Yup.string().required("Images cannot be empty.")),
    medias: Yup.array().of(Yup.string().required("Medias cannot be empty.")),
    timeout: Yup.mixed().optional(),
    type: Yup.mixed().oneOf(Object.values(MessageType), "Invalid message type").required("Message type is required."),
    isAllowManualTime: Yup.boolean().default(false),
    isOfferRestart: Yup.boolean().default(false),
    isComment: Yup.boolean().default(false),
    isCourseEnd: Yup.boolean().default(false),
    isBarometer: Yup.boolean().default(false),
    sliderPropIds: Yup.array().of(Yup.string().uuid()).optional(),
});


