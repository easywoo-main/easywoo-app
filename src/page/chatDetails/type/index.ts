import {ChatMessage} from "../../../type/chatMessage";
import {MessageChoice} from "../../../type/messageChoice.type";

export interface TreeNode {
    name: string
    attributes: any
    children: TreeNode[]
}