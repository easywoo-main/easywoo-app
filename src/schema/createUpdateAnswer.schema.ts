import * as Yup from "yup";
export const createUpdateAnswerSchema = Yup.object().shape({
    // name: Yup.string().required('Message name cannot be empty.'),
    text: Yup.string().required('Message text cannot be empty.'),
    infoText: Yup.string().optional(),
    goToStep: Yup.number().typeError("Step id must be a number.").required("Step id required."),
    // prevMessageId: Yup.string().uuid().optional(),
});


