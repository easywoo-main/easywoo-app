import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Chat } from '../../../type/chat.type';

interface DeleteChatModalProps {
    chat: Chat;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteChatModal: React.FC<DeleteChatModalProps> = ({ chat, onClose, onDelete }) => {
    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Delete Chat</DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to delete the chat "{chat.name}"?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={onDelete} color="error">Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteChatModal;
