import React, {useEffect, useState} from "react";
import {Chat} from "../../../type/chat.type";
import Tree from "react-d3-tree";
import {TreeNode} from "../type";
import {useCenteredTree} from "../../../utils/helper";
import Node from "./Node";
import {getChatMessageById} from "../../../api/chatMessage.service";
import {ChatMessageWithRelations} from "../../../type/chatMessage";
import {MessageChoiceWithRelationDto} from "../../../type/messageChoice.type";
import {getMessageChoiceById} from "../../../api/messageChoice.service";
import {nextChoiceMessageTypes} from "../constants";
import {User} from "../../../type/user.type";

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

    const chatMessageToNode = (entity: ChatMessageWithRelations): TreeNode => {
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

    const messageChoiceToNode = (entity: MessageChoiceWithRelationDto): TreeNode => {
        return {name: entity.name, attributes: entity, children: entity.nextMessage? [chatMessageToNode(entity.nextMessage)]: []};
    }


    const handleRefreshNode = async (node: TreeNode[], nodeId: string): Promise<TreeNode[]> => {
        console.log("refresh")
        return Promise.all(
            node.map(async (item) => {
                if (item.attributes.id === nodeId && item.attributes.type) {
                    const updatedNode = await getChatMessageById(nodeId);
                    const nodeChatMessage = chatMessageToNode(updatedNode)
                    return {...nodeChatMessage, children: await handleRefreshNode(item.children, nodeId)};
                } else if (item.attributes.id === nodeId && !item.attributes.type) {
                    const updatedNode = await getMessageChoiceById(nodeId);
                    const nodeMessageChoice = messageChoiceToNode(updatedNode)
                    return {...nodeMessageChoice, children: await handleRefreshNode(item.children, nodeId)};
                }
                return {
                    ...item,
                    children: await handleRefreshNode(item.children, nodeId),
                };
            })
        );
    };

    return (
        <div style={{width: "100vw", height: "100vh"}} ref={containerRef}>
            <Tree
                data={treeData}
                dimensions={dimensions}
                translate={translate}
                zoomable
                collapsible={false}
                nodeSize={{x: 500, y: 500}}
                orientation="vertical"
                renderCustomNodeElement={({nodeDatum, addChildren}) => (
                    <Node treeNode={nodeDatum as TreeNode}
                          addChildren={addChildren} handleUpdateNodeAndShowChildren={handleUpdateNodeAndShowChildren} chatId={chat.id}/>)}
            />
        </div>
    );
};


export default ChatTree;