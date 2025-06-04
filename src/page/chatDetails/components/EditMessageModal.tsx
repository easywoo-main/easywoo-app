import React, {useEffect, useState} from "react";
import {ChatMessage, ChatMessageWithRelations} from "../../../type/chatMessage";
import {deleteChatMessage, getChatMessageById, updateChatMessage} from "../../../api/chatMessage.service";
import MessageModal from "./MessageModal";
import {CircularProgress, Dialog, Typography} from "@mui/material";
import DeleteModal from "../../../components/DeleteModal";
import {AxiosError} from "axios";
import {entityToDto} from "../../../utils/chat-message.mapper";

interface EditMessageModalProps {
    onClose: () => void;
    onSubmit: (newMessage: ChatMessage) =>  Promise<void> | void;
    messageId: string;
}

const EditMessageModal: React.FC<EditMessageModalProps> = ({onClose, onSubmit, messageId}) => {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [message, setMessage] = useState<ChatMessageWithRelations>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    useEffect(() => {
        fetchMessage()
    }, [messageId]);

    const fetchMessage = async () => {
        setLoading(true);
        try {
            const chatMessage = await getChatMessageById(messageId);
            setMessage(chatMessage);
        } catch (err: AxiosError | any) {
            console.log(err?.response?.data?.message);
            setError(err?.response?.data?.message || 'An error occurred while saving.');
        } finally {
            setLoading(false);
        }
    }

    const handleSave = async (data: any) => {
        const newChatMessage = await updateChatMessage(messageId, data);
        await onSubmit(newChatMessage);
        onClose();
    };

    const handleDeleteMessage = async () => {
        const deletedMessage = await deleteChatMessage(messageId)
        await onSubmit(deletedMessage);
        onClose();
    }


    return (<Dialog open onClose={onClose} maxWidth="md" fullWidth>
            {loading && <CircularProgress size={24}/>}
            {error && (<Typography color="error" style={{marginRight: 10}}>
                    {error}
                </Typography>)}
            {message && (<>
                    <MessageModal
                        saveMessage={handleSave}
                        onClose={onClose}
                        onDelete={() => setIsOpenDeleteModal(true)}
                        chatMessageId={message.id}
                        chatId={message.chatId}
                        message={entityToDto(message)}
                    />
                    {isOpenDeleteModal && (<DeleteModal
                            onDelete={handleDeleteMessage}
                            onClose={() => setIsOpenDeleteModal(false)}
                            title="Delete Answer"
                            content={`Are you sure you want to delete the message ${message.stepName}?`}
                        />)}
                </>)}
        </Dialog>
    );
}

export default EditMessageModal;
