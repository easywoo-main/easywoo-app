import {ChatMessageWithRelations} from "../../type/chatMessage";
import {CreateUpdateChatMessageDto, CreateUpdateSliderPropDto, TreeNode} from "./type";
import {SliderProp} from "../../type/messageSlider.type";
import {nextChoiceMessageTypes} from "./constants";
import {MessageChoiceWithRelationDto} from "../../type/messageChoice.type";

export const chatMessageToDto = (entity: ChatMessageWithRelations): CreateUpdateChatMessageDto => {
    return {
        name: entity.name,
        files: entity.files,
        timeout: entity.timeout,
        type: entity.type,
        sliderProps: entity.sliderProps?.map(sliderPropsToDto),
        isCheckpoint: entity.isCheckpoint
    };
}

export const sliderPropsToDto = (entity: SliderProp): CreateUpdateSliderPropDto => {
    return {
        id: entity.id,
        name: entity.name,
        type: entity.type
    }
}

export const chatMessageToNode = (entity: ChatMessageWithRelations): TreeNode => {
    if (nextChoiceMessageTypes.includes(entity.type)) {
        return {
            name: entity.name,
            attributes: entity,
            children: entity.nextChoices ? entity.nextChoices.map(messageChoiceToNode) : []
        };
    }

    return {
        name: entity.name,
        attributes: entity,
        children: entity.nextMessage ? [chatMessageToNode(entity.nextMessage)] : []
    };
}

export const messageChoiceToNode = (entity: MessageChoiceWithRelationDto): TreeNode => {
    return {name: entity.name, attributes: entity, children: entity.nextMessage? [chatMessageToNode(entity.nextMessage)]: []};
}
