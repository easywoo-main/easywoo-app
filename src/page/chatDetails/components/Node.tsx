import React from 'react';
import {TreeNode} from '../type';
import {MessageType} from "../../../type/chatMessage";
import {Box, Typography, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface QuestionComponentProps {
    onEditClick: (nodeId: string, type: MessageType) => void;
    treeNode: TreeNode;
    showChildren: (nodeId: string) => void;
    addChildren: (nodeId: string, type: MessageType) => void;
}

const Node: React.FC<QuestionComponentProps> = ({
                                                    onEditClick,
                                                    treeNode,
                                                    addChildren,
                                                    showChildren
                                                }: QuestionComponentProps) => {
    const handleEditMessage = () => {
        onEditClick(treeNode.attributes.id, treeNode.attributes.type);
    };

    const handleAddChildren = () => {
        addChildren(treeNode.attributes.id, treeNode.attributes.type);
    }

    const handleShowChildren = () => {
        showChildren(treeNode.attributes.id);
    }
    const typeBorderColorMap: Record<string, string> = {
        TEXT: "blue",
        FILE: "green",
        CHALLENGE: "orange",
        QUESTION_SINGLE: "purple",
        QUESTION_TEXT_FIELD: "teal",
        // додай інші типи за потреби
    };

    const borderColor = typeBorderColorMap[treeNode.attributes.type] || "gray";
    return (
        <svg width="400" height="350" x="-200" y="-300" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="400" height="350" fill="white" stroke="#ccc" strokeWidth="2" rx="10"/>

            <foreignObject x="0" y="0" width="400" height="350">
                <Box sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",

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
                                onClick={handleShowChildren}
                            >
                                Show Children
                            </Button>
                        )}

                        <Button
                            variant="contained"
                            color="warning"
                            onClick={handleEditMessage}
                        >
                            Edit Message
                        </Button>

                        {(treeNode.children.length === 0 ||
                            [MessageType.QUESTION_SINGLE].includes(treeNode.attributes.type)) && (
                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                onClick={handleAddChildren}
                            >
                                Add Children
                            </Button>
                        )}
                    </Stack>
                </Box>

            </foreignObject>

        </svg>
    );
};

export default Node;