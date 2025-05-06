import * as Yup from "yup";
import { InferType } from "yup";
import { Resolver } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

// Оголошення схеми валідації
export const createUpdateAnswerSchema = Yup.object().shape({
    name: Yup.string().required('Message text cannot be empty.'),
    file: Yup.string().url(),
    prevMessageId: Yup.string().uuid(),
});

export type CreateUpdateAnswerType = InferType<typeof createUpdateAnswerSchema>;


export const createUpdateAnswerResolver = yupResolver(createUpdateAnswerSchema);
