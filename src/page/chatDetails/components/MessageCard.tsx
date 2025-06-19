import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, CircularProgress, FormHelperText, Typography} from '@mui/material';
import {
    ChatMessage,
    ChatMessageWithChoices,
    ChatMessageWithRelations,
    CreateChatMessageDto
} from '../../../type/chatMessage';
import DeleteModal from '../../../components/DeleteModal';
import EditMessageModal from './EditMessageModal';
import {deleteChatMessage, getChatMessageById} from "../../../api/chatMessage.service";
import CreateMessageModal from './CreateMessageModal';
import {AxiosError} from "axios";
import {entityToDto} from "../../../utils/chat-message.mapper";

interface Props {
    message: ChatMessageWithChoices;
    onUpdate: () => void;
}

const MessageCard: React.FC<Props> = ({ message, onUpdate }) => {
    const [messageCopy, setMessageCopy] = useState<ChatMessageWithRelations>();
    const [error, setError] = useState<string>();
    const [warnings, setWarnings] = useState<Record<string, string>>({});

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

    const [isCopyLoading, setIsCopyLoading] = useState(false);
    const handleUpdate = (_newMessage: ChatMessage)=> {
        onUpdate();
    }

    const handleDelete = async ()=> {
        await deleteChatMessage(message.id)
    }


    useEffect(() => {
        if ((message.goToStep && !message.nextMessageId) || (message.restartFrom && !message.restartMessageId)) {
            setWarnings((prevState: any) => ({ ...prevState, goToStep: "Some Go to step is invalid" }));
        }
        message.nextChoices?.forEach((item) => {
            if (!item.goToStep) {
                setWarnings((prevState: any) => ({
                    ...prevState,
                    answers: "Step is missing"
                }));
            } else if (!item.nextMessageId) {
                setWarnings((prevState: any) => ({
                    ...prevState,
                    goToStep: "Some Go to step invalid"
                }));
            }
        });
    }, [message]);

    const copyMessageAndOpenModal = async () => {
        setIsCopyLoading(true);
        try {
            const chatMessage = await getChatMessageById(message.id);
            setMessageCopy(chatMessage);
            setOpenCreate(true)
        } catch (err: AxiosError | any) {
            setWarnings((prevState: any) => ({
                ...prevState,
                copy: err?.response?.data?.message || 'An error occurred while copying the message.'
            }));
        } finally {
            setIsCopyLoading(false);
        }
    }
    const copy = (message: ChatMessageWithRelations) => {
        const createChatMessageDto= entityToDto(message);
        createChatMessageDto.stepId = undefined;
        createChatMessageDto.stepName += " Copy";
        return createChatMessageDto;
    }


    return (
        <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ mb: 1, width: 300}}>Step ID: {message.stepId}</Typography>
                    <Typography variant="h5" sx={{ mb: 1 }}>Step name: {message.stepName}</Typography>
                </Box>

                    <FormHelperText sx={{ color: 'red' }}>
                        {Object.values(warnings).map((warning: string, idx) => (
                            <Typography key={idx} variant="body2">{warning}</Typography>
                        ))}
                        {/*<Typography key="error" variant="body2">{error}</Typography>*/}
                    </FormHelperText>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <Button onClick={() => setOpenDelete(true)} variant="outlined" color="error">
                        Delete
                    </Button>
                    <Button variant="contained" onClick={copyMessageAndOpenModal}>
                        {isCopyLoading ? <CircularProgress size={24}/> : 'Copy'}
                    </Button>
                    <Button variant="contained" onClick={() => setOpenEdit(true)}>
                        Edit
                    </Button>
                </Box>
            </CardContent>

            {openEdit && (
                <EditMessageModal
                    messageId={message.id}
                    onClose={() => setOpenEdit(false)}
                    onSubmit={handleUpdate}
                />
            )}
            {openCreate && messageCopy && (
                    <CreateMessageModal
                        chatId={message.chatId}
                        onClose={() => setOpenCreate(false)}
                        onSubmit={handleUpdate}
                        createMessage={copy(messageCopy)}
                    />
                )
            }

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
