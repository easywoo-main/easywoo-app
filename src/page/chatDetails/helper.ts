import {ChatMessageWithRelations} from "../../type/chatMessage";
import {TreeNode} from "./type";

export const chatMessageToNode = (entity: ChatMessageWithRelations): TreeNode => {
    let children: ChatMessageWithRelations[] = [];

    if (entity?.nextChoices && entity?.nextChoices?.length > 0) {
        children = entity.nextChoices
            .map(messageChoice => messageChoice.nextMessage)
            .filter((nextMessage): nextMessage is ChatMessageWithRelations => !!nextMessage);
    } else if (entity?.nextMessage) {
        children = [entity.nextMessage];
    }


    return {
        name: entity.stepName, attributes: entity, children: children.map(chatMessageToNode)
    }
}
