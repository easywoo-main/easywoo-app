import React, {useState} from "react";
import {TreeNode} from "./type";
import {QuestionType} from "../../type/chatMessage";
import {getChatMessageById} from "../../api/chatMessage.service";

const ChatMessageDetails: React.FC = () => {
    const [treeData, setTreeData] = useState<TreeNode<any>[]>([]);

    const getChildren = async (nodeId: string, messageType: QuestionType) => {
        try {

        }catch (error) {
            console.error("Error fetching children:", error);
        }
    }

    return (
        <div>
            hello
        </div>
    )
}

export default ChatMessageDetails;