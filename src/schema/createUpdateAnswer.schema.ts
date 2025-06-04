import * as Yup from "yup";
export const createUpdateAnswerSchema = Yup.object().shape({
    // name: Yup.string().required('Message name cannot be empty.'),
    text: Yup.string().required('Message text cannot be empty.'),
    infoText: Yup.string().optional(),
    file: Yup.string().optional(),
    goToStep: Yup.number()
        .nullable()
        .transform((value, originalValue) => originalValue === "" ? null : value)
        .typeError("Step id must be a number.")
        .optional(),    // prevMessageId: Yup.string().uuid().optional(),
});


