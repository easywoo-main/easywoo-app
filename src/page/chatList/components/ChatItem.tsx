import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Chat } from '../../../type/chat.type';

interface ChatItemProps {
    chat: Chat;
    onEditDetailsClick: (chat: Chat) => void;
    onDeleteClick: (chat: Chat) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat, onEditDetailsClick, onDeleteClick }) => {
    const navigate = useNavigate();

    return (
        <Card variant="outlined" sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h6">{chat.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                    Created on: {new Date(chat.createdAt).toLocaleDateString()}
                </Typography>
                <div>
                    <Button onClick={() => onEditDetailsClick(chat)} color="primary" variant="outlined" sx={{ marginRight: 2 }}>
                        Edit Name
                    </Button>
                    <Button onClick={() => navigate(`/chat/${chat.id}`)} variant="outlined" color="primary" sx={{ marginRight: 2 }}>
                        Edit Message
                    </Button>
                    <Button onClick={() => onDeleteClick(chat)} variant="outlined" color="error">
                        Delete
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ChatItem;
