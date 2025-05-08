import * as Yup from "yup";
import {InferType} from "yup";

export const createUpdateInfoPopupSchema = Yup.object().shape({
    id: Yup.string().uuid().optional(),
    title: Yup.string().required('Title is required.'),
    description: Yup.string().optional(),
});

export type CreateUpdateInfoPopUpType = InferType<typeof createUpdateInfoPopupSchema>;