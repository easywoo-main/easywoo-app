import React, {useEffect, useState} from "react";
import {Chat} from "../../../type/chat.type";
import Tree from "react-d3-tree";
import {CreateUpdateAnswerDto, CreateUpdateChatMessageDto, TreeNode} from "../type";
import {useCenteredTree} from "../../../utils/helper";
import Node from "./Node";
import {createChatMessage, getChatMessageById, updateChatMessage} from "../../../api/chatMessage.service";
import {ChatMessageWithRelations, MessageType} from "../../../type/chatMessage";
import {MessageChoice} from "../../../type/messageChoice.type";
import CreateEditMessageModal from "./CreateEditMessageModal";
import CreateEditAnswerModal from "./CreateEditAnswerModal";

interface TreeProps {
    chat: Chat;
}

const ChatTree: React.FC<TreeProps> = ({chat}) => {
    const [treeData, setTreeData] = useState<TreeNode[]>([{name: chat.name, attributes: chat, children: []}]);
    const [dimensions, translate, containerRef] = useCenteredTree();

    const [openCreateEditMessageModal, setOpenCreateEditMessageModal] = useState(false);
    const [openCreateEditAnswerModal, setOpenCreateEditAnswerModal] = useState(false);
    const [parentId, setParentId] = useState<string | null>(null);
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
        if ([MessageType.TEXT, MessageType.FILE, MessageType.QUESTION_SLIDERS, MessageType.CHALLENGE].includes(entity.type)) {
            return {
                name: entity.name,
                attributes: entity,
                children: entity.nextMessage ? [chatMessageToNode(entity.nextMessage)] : []
            };
        }
        return {
            name: entity.name,
            attributes: entity,
            children: entity.nextChoices ? entity.nextChoices.map(messageChoiceToNode) : []
        };
    }

    const messageChoiceToNode = (entity: MessageChoice): TreeNode => {
        return {name: entity.name, attributes: entity, children: []};
    }


    const chatMessageToDto = (entity: ChatMessageWithRelations): CreateUpdateChatMessageDto => {
        return {
            name: entity.name,
            files: entity.files,
            timeout: entity.timeout,
            type: entity.type,
        };
    }

    const answerToDto = (entity: MessageChoice): CreateUpdateAnswerDto => {
        return {
            name: entity.name,
            prevMessageId: parentId!,
        }
    }

    const handleRefreshNode = async (node: TreeNode[], nodeId: string): Promise<TreeNode[]> => {
        return Promise.all(
            node.map(async (item) => {
                if (item.attributes.id === nodeId) {
                    const updatedNode = await getChatMessageById(nodeId);
                    return chatMessageToNode(updatedNode);
                }
                return {
                    ...item,
                    children: await handleRefreshNode(item.children, nodeId),
                };
            })
        );
    };

    const handleCreateChatMessage = async (newStep: CreateUpdateChatMessageDto) => {
        newStep.prevMessageId = parentId!;
        await createChatMessage(newStep);
        setOpenCreateEditMessageModal(false)
        await handleShowChildren(newStep.prevMessageId);
    };

    const handleUpdateMessage = async (newStep: CreateUpdateChatMessageDto) => {
        const updatedChatMessage = await updateChatMessage(selectedNode!.id, newStep);
        setOpenCreateEditMessageModal(false)
        await handleShowChildren(updatedChatMessage.id);
    }

    const handleOpenCreateModal = (parentId: string) => {
        setParentId(parentId);
        setOpenCreateEditMessageModal(true);
    }

    const handleOpenEditModal = async (nodeId: string) => {
        const node = await getChatMessageById(nodeId);
        setSelectedNode(node);
        setOpenCreateEditMessageModal(true);
    }

    const handleCloseModal = () => {
        setOpenCreateEditMessageModal(false);
        setSelectedNode(null);
        setParentId(null);
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
                renderCustomNodeElement={({nodeDatum}) => (
                    <Node treeNode={nodeDatum as TreeNode} onEditClick={handleOpenEditModal}
                          addChildren={handleOpenCreateModal} showChildren={handleShowChildren}/>)}
            />
            {openCreateEditMessageModal && <CreateEditMessageModal
                onClose={handleCloseModal}
                onSubmit={selectedNode ? handleUpdateMessage : handleCreateChatMessage}
                message={selectedNode ? chatMessageToDto(selectedNode! as ChatMessageWithRelations) : null}
            />}
            {openCreateEditAnswerModal && <CreateEditAnswerModal
                answer={selectedNode ? answerToDto(selectedNode! as MessageChoice) : null}/>

            }
        </div>
    );
};


export default ChatTree;