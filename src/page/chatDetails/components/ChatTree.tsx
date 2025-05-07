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

interface TreeProps {
    chat: Chat;
}

const ChatTree: React.FC<TreeProps> = ({chat}) => {
    const [treeData, setTreeData] = useState<TreeNode[]>([{name: chat.name, attributes: chat, children: []}]);
    const [dimensions, translate, containerRef] = useCenteredTree();

    useEffect(() => {
        handleGetRootNode(chat.startMessageId!);
    }, [chat]);

    const handleGetRootNode = async (nodeId: string) => {
        const node = await getChatMessageById(nodeId);
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
        return Promise.all(
            node.map(async (item) => {
                if (item.attributes.id === nodeId && item.attributes.type) {
                    const updatedNode = await getChatMessageById(nodeId);
                    return chatMessageToNode(updatedNode);
                } else if (item.attributes.id === nodeId && !item.attributes.type) {
                    const updatedNode = await getMessageChoiceById(nodeId);
                    return messageChoiceToNode(updatedNode);
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
                          addChildren={addChildren} handleUpdateNodeAndShowChildren={handleUpdateNodeAndShowChildren} />)}
            />
        </div>
    );
};


export default ChatTree;