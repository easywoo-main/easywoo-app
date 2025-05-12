import React, {useState} from 'react';
import {TreeNode} from '../type';
import {ChatMessage, MessageType} from "../../../type/chatMessage";
import {Box, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import EditAnswerModal from "./EditAnswerModal";
import CreateAnswerModal from './CreateAnswerModal';
import CreateMessageModal from "./CreateMessageModal";
import {AddChildrenFunction} from "react-d3-tree/lib/types/types/common";
import {getChatMessageById} from "../../../api/chatMessage.service";
import {chatMessageToNode, messageChoiceToNode} from '../helper';
import {MessageChoice} from "../../../type/messageChoice.type";
import {getMessageChoiceById} from '../../../api/messageChoice.service';
import EditMessageModal from './EditMessageModal';

interface QuestionComponentProps {
    treeNode: TreeNode;
    handleUpdateNodeAndShowChildren: (nodeId: string) => void;
    addChildren: AddChildrenFunction;
}

const Node: React.FC<QuestionComponentProps> = ({
                                                    treeNode,
                                                    addChildren,
                                                    handleUpdateNodeAndShowChildren
                                                }: QuestionComponentProps) => {

    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isOpenCreateChildrenModal, setIsOpenCreateChildrenModal] = useState(false);

    const isAnswer = !treeNode.attributes.type;


    const handleEditMessage = () => {
        setIsOpenEditModal(true)
    };

    const handleAddChatMessageChildren = async (message: ChatMessage) => {
        const newMessage =  await getChatMessageById(message.id);
        addChildren([ chatMessageToNode(newMessage)]);
    }

    const handleAddMessageChoiceChildren = async (messageChoice: MessageChoice) => {
        const newMessage = await getMessageChoiceById(messageChoice.id);
        addChildren([ messageChoiceToNode(newMessage)]);
    }

    const handleUpdateChatMessage = async (message: ChatMessage) => {
        handleUpdateNodeAndShowChildren(message.id)
    }

    const handleUpdateAnswer = async (answer: MessageChoice) => {
        handleUpdateNodeAndShowChildren(answer.id)
    }

    const typeBorderColorMap: Record<string, string> = {
        TEXT: "blue",
        FILE: "green",
        CHALLENGE: "orange",
        QUESTION_SINGLE: "purple",
        QUESTION_TEXT_FIELD: "teal",
    };
    const borderColor = typeBorderColorMap[treeNode.attributes.type] || "gray";
    const background = (treeNode.attributes?.stepChatMessages?.length > 0 || treeNode.attributes?.resultMessageChoice?.length> 0) ? '#ededed' : 'white';
    return (
        <svg width="400" height="350" x="-200" y="-300" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="400" height="350" fill="white" stroke="#ccc" strokeWidth="2" rx="10"/>
            <foreignObject x="0" y="0" width="400" height="350">
                <Box sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background
                }}>
                    <Box
                        sx={{
                            overflowY: 'auto',
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-wrap',
                            p: 1,
                            m: 2,
                            borderTop: `4px solid ${borderColor}`,
                        }}
                    >
                        <Typography>
                            <strong>Name:</strong> {treeNode.name}
                        </Typography>
                    </Box>

                    <Stack spacing={2} sx={{m: 2}}>
                        {treeNode.children.length === 0 && (
                            <Button
                                variant="contained"
                                color="info"
                                fullWidth
                                onClick={() => handleUpdateNodeAndShowChildren(treeNode.attributes.id)}
                            >
                                Show Children
                            </Button>
                        )}

                        <Button
                            variant="contained"
                            color="warning"
                            onClick={handleEditMessage}
                        >
                            {isAnswer ? " Answer Details" : "Message Details"}
                        </Button>

                        {(treeNode.children.length === 0 ||
                            [MessageType.QUESTION_SINGLE].includes(treeNode.attributes.type)) && (
                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                onClick={()=>setIsOpenCreateChildrenModal(true)}
                            >
                                Add Children
                            </Button>
                        )}
                    </Stack>
                </Box>

                {isOpenEditModal && (isAnswer ?
                    <EditAnswerModal answer={treeNode.attributes} onClose={()=> setIsOpenEditModal(false)} onSubmit={handleUpdateAnswer}/>:
                    <EditMessageModal onClose={()=> setIsOpenEditModal(false)} message={treeNode.attributes} onSubmit={handleUpdateChatMessage}/>
                )}

                {isOpenCreateChildrenModal && (treeNode.attributes.type === MessageType.QUESTION_SINGLE ?
                    <CreateAnswerModal onClose={() => setIsOpenCreateChildrenModal(false)} onSubmit={handleAddMessageChoiceChildren} prevMessageId={treeNode.attributes.id}/>:
                    <CreateMessageModal onClose={() => setIsOpenCreateChildrenModal(false)} onSubmit={handleAddChatMessageChildren} prevMessageId={treeNode.attributes.type ? treeNode.attributes.id: undefined} prevChoiceId={!treeNode.attributes.type ? treeNode.attributes.id: undefined}/>)}
            </foreignObject>

        </svg>
    );
};

export default Node;