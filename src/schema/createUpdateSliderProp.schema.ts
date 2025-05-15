import * as Yup from "yup";
import {SliderPropType} from "../type/messageSlider.type";
import {InferType} from "yup";

export const createUpdateSliderPropSchema = Yup.object().shape({
    id: Yup.string().uuid().optional(),
    name: Yup.string().required("Slider name cannot be empty."),
    text: Yup.string().required("Slider text cannot be empty."),
    type: Yup.mixed().oneOf(Object.values(SliderPropType), "Invalid slider type").required("Slider type is required."),
})

export type CreateUpdateSliderPropType = InferType<typeof createUpdateSliderPropSchema>;