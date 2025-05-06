import React, {useEffect, useState} from "react";
import {Chat} from "../../../type/chat.type";
import Tree from "react-d3-tree";
import {CreateUpdateAnswerDto, CreateUpdateChatMessageDto, CreateUpdateSliderPropDto, TreeNode} from "../type";
import {useCenteredTree} from "../../../utils/helper";
import Node from "./Node";
import {createChatMessage, getChatMessageById, updateChatMessage} from "../../../api/chatMessage.service";
import {ChatMessageWithRelations, MessageType} from "../../../type/chatMessage";
import {MessageChoice, MessageChoiceWithRelationDto} from "../../../type/messageChoice.type";
// import CreateEditMessageModal from "./CreateEditMessageModal";
import {createMessageChoice, getMessageChoiceById, updateMessageChoice} from "../../../api/messageChoice.service";
import {SliderProp} from "../../../type/messageSlider.type";
import {nextChoiceMessageTypes} from "../constants";

interface TreeProps {
    chat: Chat;
}

const ChatTree: React.FC<TreeProps> = ({chat}) => {
    const [treeData, setTreeData] = useState<TreeNode[]>([{name: chat.name, attributes: chat, children: []}]);
    const [dimensions, translate, containerRef] = useCenteredTree();

    const [openCreateEditMessageModal, setOpenCreateEditMessageModal] = useState(false);
    const [openCreateEditAnswerModal, setOpenCreateEditAnswerModal] = useState(false);
    const [parentMessageId, setParentMessageId] = useState<string | null>(null);
    const [parentAnswerId, setParentAnswerId] = useState<string | null>(null);
    const [selectedNode, setSelectedNode] = useState<ChatMessageWithRelations | MessageChoice | null>(null);

    useEffect(() => {
        handleGetRootNode(chat.startMessageId!);
    }, [chat]);

    const handleGetRootNode = async (nodeId: string) => {
        const node = await getChatMessageById(nodeId);
        setTreeData([chatMessageToNode(node)]);
    }

    const handleShowChildren = async (nodeId: string) => {
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


    const chatMessageToDto = (entity: ChatMessageWithRelations): CreateUpdateChatMessageDto => {
        return {
            name: entity.name,
            files: entity.files,
            timeout: entity.timeout,
            type: entity.type,
            sliderProps: entity.sliderProps?.map(sliderPropsToDto),
            isCheckpoint: entity.isCheckpoint
        };
    }

    const sliderPropsToDto = (entity: SliderProp): CreateUpdateSliderPropDto => {
        return {
            id: entity.id,
            name: entity.name,
            type: entity.type
        }
    }

    const answerToDto = (entity: MessageChoice): CreateUpdateAnswerDto => {
        return {
            name: entity.name,
            prevMessageId: parentMessageId!,
        }
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

    const handleOpenEditModal = async (nodeId: string, type: MessageType) => {
        if (!type) {
            const node = await getMessageChoiceById(nodeId);
            setParentMessageId(node.prevMessageId);
            setSelectedNode(node);
            setOpenCreateEditAnswerModal(true);
        } else {
            const node = await getChatMessageById(nodeId);
            setSelectedNode(node);
            setOpenCreateEditMessageModal(true);
        }
    }

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
                          addChildren={addChildren} showChildren={handleShowChildren} />)}
            />
            {/*{openCreateEditMessageModal && <CreateEditMessageModal*/}
            {/*    onClose={handleCloseModal}*/}
            {/*    onSubmit={selectedNode ? handleUpdateMessage : handleCreateChatMessage}*/}
            {/*    message={selectedNode ? chatMessageToDto(selectedNode! as ChatMessageWithRelations) : null}*/}
            {/*/>}*/}
            {/*{openCreateEditAnswerModal && <CreateEditAnswerModal*/}
            {/*    answer={selectedNode ? answerToDto(selectedNode! as MessageChoice) : null}*/}
            {/*    onSubmit={selectedNode ? handleUpdateAnswer : handleCreateAnswer}*/}
            {/*    onClose={handleCloseModal}*/}
            {/*/>*/}
            {/*}*/}
        </div>
    );
};


export default ChatTree;