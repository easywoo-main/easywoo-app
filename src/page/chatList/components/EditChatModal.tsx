import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress, Typography } from '@mui/material';
import { Chat } from '../../../type/chat.type';
import { updateChat } from "../../../api/chat.service";

interface EditChatModalProps {
    chat: Chat;
    onClose: () => void;
}

const EditChatModal: React.FC<EditChatModalProps> = ({ chat, onClose }) => {
    const [name, setName] = useState<string>(chat.name);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async () => {
        if (name.trim() === '') {
            setError('Chat name cannot be empty.');
            return;
        }
        setLoading(true);
        try {
            const updatedChat: Chat = { ...chat, name };
            await updateChat(chat.id, updatedChat);
            onClose();
        } catch (error) {
            setError('An error occurred while updating the chat.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Edit Chat</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Chat Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                />
                {error && <Typography color="error">{error}</Typography>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary" disabled={loading || !name}>
                    {loading ? <CircularProgress size={24} /> : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditChatModal;
