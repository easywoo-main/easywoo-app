import {ChatMessageWithRelations} from "../../type/chatMessage";
import {TreeNode} from "./type";
import {nextChoiceMessageTypes} from "./constants";
import {MessageChoiceWithRelationDto} from "../../type/messageChoice.type";


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
