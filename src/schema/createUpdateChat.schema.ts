import * as Yup from "yup";
import {createUpdateSliderPropSchema} from "./createUpdateSliderProp.schema";
import {CreateUpdateSliderPropDto} from "../type/messageSlider.type";
import {MATH_OPERATORS} from "../utils/constant.utils";

export const validationSchema = Yup.object().shape({
    name: Yup.string().required('Chat name cannot be empty.'),
    freeSteps: Yup.number().min(0, 'Free steps must be a positive number or zero.').required('Free steps are required.'),
    price: Yup.number().min(0, 'Price must be a positive number or zero.').required('Price is required.'),
    landingUrl: Yup.string().url("Must be url").optional(),
    hasIndividualConsultation: Yup.boolean().default(false),
    isDisabled: Yup.boolean().default(false),
    sliderProps: Yup.array().of(createUpdateSliderPropSchema).optional(),
    paintPoints: Yup.array().of(Yup.string()).optional(),
    formula: Yup.string().required("Formula is required")
        .test('is-contains-slider-name', function(value) {
            if (!value) {
                return true;
            }

            const { path, createError, parent } = this;

            const sliderProps: CreateUpdateSliderPropDto[] = parent?.sliderProps || [];
            const sliderPropNames = sliderProps.map(prop => prop.name);

            const partsEquation = [...sliderPropNames, ...MATH_OPERATORS];
            const escapedOperators = MATH_OPERATORS.map(op => '\\' + op).join('|');
            const regex = new RegExp(`(${escapedOperators})`, 'g');

            const parts = value.split(regex).filter(part => part.trim() !== '');

            let openBrackets = 0;
            for (const part of parts) {
                const trimPart = part.trim();

                if (trimPart === '(') {
                    openBrackets++;
                } else if (trimPart === ')') {
                    openBrackets--;
                    if (openBrackets < 0) {
                        return createError({
                            path,
                            message: "Closing bracket without matching opening bracket"
                        });
                    }
                }

                if (!isNaN(Number(trimPart))) {
                    continue;
                }

                if (!partsEquation.includes(trimPart)) {
                    return createError({
                        path,
                        message: `Unknown variable or operator: '${trimPart}'`
                    });
                }
            }

            if (openBrackets !== 0) {
                return createError({
                    path,
                    message: "Opening bracket without matching closing bracket"
                });
            }

            return true;
        })
});
