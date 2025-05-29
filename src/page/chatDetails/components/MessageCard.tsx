import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import {ChatMessage, ChatMessageWithPrevMessage} from '../../../type/chatMessage';
import DeleteModal from '../../../components/DeleteModal';
import EditMessageModal from './EditMessageModal';
import {deleteChatMessage} from "../../../api/chatMessage.service";

interface Props {
    message: ChatMessageWithPrevMessage;
    onUpdate: () => void;
}

const MessageCard: React.FC<Props> = ({ message, onUpdate }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const handleUpdate = (_newMessage: ChatMessage)=> {
        onUpdate();
    }

    const handleDelete = async ()=> {
        await deleteChatMessage(message.id)
    }
    return (
        <Card>
            <CardContent>
                <Typography variant="subtitle1">Step ID: {message.stepId}</Typography>
                <Typography variant="h6">{message.stepName}</Typography>
                <Box mt={2} display="flex" gap={2}>
                    <Button onClick={() => setOpenDelete(true)} variant="outlined" color="error">
                        Delete
                    </Button>
                    <Button variant="contained" onClick={() => setOpenEdit(true)}>Edit</Button>
                </Box>
            </CardContent>

            {openEdit && (
                <EditMessageModal
                    messageId={message.id}
                    onClose={() => setOpenEdit(false)}
                    onSubmit={handleUpdate}
                />
            )}

            {openDelete && (
                <DeleteModal
                    title="Delete step"
                    onClose={() => setOpenDelete(false)}
                    content="Are you sure you want to delete this step?"
                    onDelete={handleDelete}
                />
            )}
        </Card>
    );
};

export default MessageCard;
