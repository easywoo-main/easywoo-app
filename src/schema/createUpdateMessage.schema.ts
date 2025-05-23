import * as Yup from "yup";
import {MessageType} from "../type/chatMessage";
import {createUpdateInfoPopupSchema} from "./createUpdateInfoPopUp.schema";

export const createUpdateMessageSchema = Yup.object().shape({
    name: Yup.string().required("Message text cannot be empty."),
    type: Yup.mixed().oneOf(Object.values(MessageType), "Invalid message type").required("Message type is required."),
    isCheckpoint: Yup.boolean().required("Checkpoint status is required."),
    files: Yup.array().of(Yup.string().url()).optional(),
    timeout: Yup.mixed()
        // .test("is-bigint", "Timeout must be a bigint", (value) => typeof value === "bigint")
        .optional(),
    infoPopUps: Yup.array().of(createUpdateInfoPopupSchema).optional(),
    isAllowManualTime: Yup.boolean().default(false),
    isOfferRestart: Yup.boolean().default(false),
    stepName: Yup.string().required("Step name is required."),
    step: Yup.string().required("Step is required."),
    question: Yup.string().optional(),
    introText: Yup.string().optional(),
    isComment: Yup.boolean().default(false),
    isCourseEnd: Yup.boolean().default(false),
    isBarometer: Yup.boolean().default(false),
    variableIds: Yup.array().of(Yup.string().uuid()).optional(),
    todoList:  Yup.array().of(Yup.string().required("Todo Item must be required"))
});


