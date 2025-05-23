import * as Yup from "yup";
import { InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const createUpdateAnswerSchema = Yup.object().shape({
    name: Yup.string().required('Message name cannot be empty.'),
    text: Yup.string().required('Message text cannot be empty.'),
    file: Yup.string().url().optional(),
    prevMessageId: Yup.string().uuid().optional(),
});


