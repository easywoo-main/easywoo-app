import React, {useEffect, useState} from "react";
import {Chat} from "../../../type/chat.type";
import Tree from "react-d3-tree";
import {TreeNode} from "../type";
import {useCenteredTree} from "../../../utils/helper";
import Node from "./Node";
import {getChatMessageById} from "../../../api/chatMessage.service";
import {User} from "../../../type/user.type";
import { chatMessageToNode } from "../helper";

interface TreeProps {
    chat: Chat;
    users: User[]
}

const ChatTree: React.FC<TreeProps> = ({chat, users}) => {
    const [treeData, setTreeData] = useState<TreeNode[]>([{name: chat.name, attributes: chat, children: []}]);
    const [dimensions, translate, containerRef] = useCenteredTree();

    useEffect(() => {
        handleGetRootNode(chat.startMessageId!);
    }, [chat, users]);

    const handleGetRootNode = async (nodeId: string) => {
        const node = await getChatMessageById(nodeId, users.map(item => item.id));
        setTreeData([chatMessageToNode(node)]);
    }

    const handleUpdateNodeAndShowChildren = async (nodeId: string) => {
        setTreeData(await handleRefreshNode(treeData, nodeId));
    }


    const handleRefreshNode = async (node: TreeNode[], nodeId: string): Promise<TreeNode[]> => {
        return Promise.all(node.map(async (item) => {
            if (item.attributes.id === nodeId) {
                const updatedNode = await getChatMessageById(nodeId);
                const nodeChatMessage = chatMessageToNode(updatedNode)
                return {...nodeChatMessage, children: await handleRefreshNode(item.children, nodeId)};
            }
            return {
                ...item, children: await handleRefreshNode(item.children, nodeId),
            };
        }));
    };

    return (<div style={{width: "100vw", height: "100vh"}} ref={containerRef}>
        <Tree
            data={treeData}
            dimensions={dimensions}
            translate={translate}
            zoomable
            collapsible={false}
            nodeSize={{x: 500, y: 500}}
            orientation="vertical"
            renderCustomNodeElement={({nodeDatum, addChildren}) => (<Node treeNode={nodeDatum as TreeNode}
                                                                          addChildren={addChildren}
                                                                          handleUpdateNodeAndShowChildren={handleUpdateNodeAndShowChildren}
                                                                          chatId={chat.id}/>)}
        />
    </div>);
};


export default ChatTree;