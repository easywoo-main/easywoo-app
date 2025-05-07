import * as Yup from "yup";
import {InferType} from "yup";

export const createUpdateInfoPopupSchema = Yup.object().shape({
    id: Yup.string().uuid().optional(),
    name: Yup.string().required('Name is required.'),
    file: Yup.string().url('File must be a valid URL.').optional(),
});

export type CreateUpdateInfoPopUpType = InferType<typeof createUpdateInfoPopupSchema>;