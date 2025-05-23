import {SliderPropType} from "../page/chatDetails/type";
import {BaseEntity} from "./chat.type";

type SliderPropDto = {
    name: string;
    text: string;
    type: SliderPropType;
    positiveMessage: string;
    negativeMessage: string;
    chatId: string;
}
export type SliderProp = BaseEntity & SliderPropDto

export type CreateUpdateSliderPropDto = {
    id?: string
} & Omit<SliderPropDto, "chatId">

export type CreateSliderPropWithRelationDto = SliderPropDto
export type UpdateSliderPropWithRelationDto  = Partial<CreateSliderPropWithRelationDto>

