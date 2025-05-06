import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Chat } from '../../../type/chat.type';
import {deleteChat} from "../../../api/chat.service";

interface DeleteChatModalProps {
    chat: Chat;
    onClose: () => void;
    onSubmit: (chat: Chat) => void;
}

const DeleteChatModal: React.FC<DeleteChatModalProps> = ({ chat, onClose, onSubmit }) => {
    const handleDeleteChat = async () => {
        if (chat) {
            try {
                const deletedChat = await deleteChat(chat.id);
                onSubmit(deletedChat);
                onClose();
            } catch (error) {
                console.error('Error deleting chat', error);
            }
        }
    }
    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Delete Chat</DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to delete the chat "{chat.name}"?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleDeleteChat} color="error">Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteChatModal;
