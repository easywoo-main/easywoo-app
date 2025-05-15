import * as Yup from "yup";
import {MessageType} from "../type/chatMessage";
import {InferType} from "yup";
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
});


export type CreateUpdateMessageType = InferType<typeof createUpdateMessageSchema>;