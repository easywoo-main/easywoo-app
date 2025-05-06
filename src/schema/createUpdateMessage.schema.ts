import * as Yup from "yup";
import {MessageType} from "../type/chatMessage";
import {SliderPropType} from "../type/messageSlider.type";
import {InferType} from "yup";

export const createUpdateMessageSchema = Yup.object().shape({
    name: Yup.string().required("Message text cannot be empty."),
    type: Yup.mixed().oneOf(Object.values(MessageType), "Invalid message type").required("Message type is required."),
    isCheckpoint: Yup.boolean().required("Checkpoint status is required."),
    files: Yup.array().of(Yup.string().url()).optional(),
    timeout: Yup.mixed()
        // .test("is-bigint", "Timeout must be a bigint", (value) => typeof value === "bigint")
        .optional(),
    sliderProps: Yup.array().of(Yup.object().shape({
        id: Yup.string().uuid().optional(),
        name: Yup.string().required("Slider text cannot be empty."),
        type: Yup.mixed().oneOf(Object.values(SliderPropType), "Invalid slider type").required("Slider type is required."),
    })).optional(),
});


export type CreateUpdateMessageType = InferType<typeof createUpdateMessageSchema>;