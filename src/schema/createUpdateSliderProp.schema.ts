import * as Yup from "yup";
import {SliderPropType} from "../type/messageSlider.type";
import {InferType} from "yup";
import {MATH_OPERATORS} from "../utils/constant.utils";

export const createUpdateSliderPropSchema = Yup.object().shape({
    id: Yup.string().uuid().optional(),
    text: Yup.string().required("Slider text cannot be empty."),
    type: Yup.mixed().oneOf(Object.values(SliderPropType), "Invalid slider type").required("Slider type is required."),
    name: Yup.string()
        .matches(/[a-zA-Z]/, "Slider name must contain at least one letter.")
        .notOneOf(MATH_OPERATORS.map(op => `.*\\${op}.*`), `Chat name cannot contain any of these symbols: ${MATH_OPERATORS.join(' ')}`)
        .required('Slider name cannot be empty.'),
})

export type CreateUpdateSliderPropType = InferType<typeof createUpdateSliderPropSchema>;