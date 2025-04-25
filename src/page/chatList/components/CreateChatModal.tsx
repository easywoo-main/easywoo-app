import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress, Typography } from '@mui/material';
import { createChat } from "../../../api/chat.service";
import { Chat } from "../../../type/chat.type";

interface CreateChatModalProps {
    onClose: () => void;
}

const CreateChatModal: React.FC<CreateChatModalProps> = ({ onClose }) => {
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (name.trim() === '') {
            setError('Chat name cannot be empty.');
            return;
        }
        setLoading(true);
        try {
            const newChat: Chat = { name } as Chat;
            await createChat(newChat);
            onClose();
        } catch (error) {
            setError('An error occurred while creating the chat.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Create Chat</DialogTitle>
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
                    {loading ? <CircularProgress size={24} /> : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateChatModal;
