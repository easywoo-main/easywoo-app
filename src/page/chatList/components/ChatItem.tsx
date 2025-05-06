import React from 'react';
import {Button, Card, CardContent, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {Chat} from '../../../type/chat.type';
import EditChatModal from "./EditChatModal";
import DeleteChatModal from "./DeleteChatModal";

interface ChatItemProps {
    chat: Chat;
    onUpdateChat: (chat: Chat) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({chat, onUpdateChat}) => {

    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleUpdateChat = (chat: Chat) => {
        onUpdateChat(chat);
    }

    return (
        <Card variant="outlined" sx={{marginBottom: 2}}>
            <CardContent>
                <Typography variant="h6">{chat.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                    Created on: {new Date(chat.createdAt).toLocaleDateString()}
                </Typography>
                <div>
                    <Button onClick={() => setIsEditModalOpen(true)} color="primary" variant="outlined"
                            sx={{marginRight: 2}}>
                        Edit Name
                    </Button>
                    <Button onClick={() => navigate(`/chat/${chat.id}`)} variant="outlined" color="primary"
                            sx={{marginRight: 2}}>
                        Edit Message
                    </Button>
                    <Button onClick={() => setIsDeleteModalOpen(true)} variant="outlined" color="error">
                        Delete
                    </Button>
                </div>
            </CardContent>
            {isEditModalOpen && <EditChatModal chat={chat} onClose={() => setIsEditModalOpen(false)} onSubmit={handleUpdateChat}/>}
            {isDeleteModalOpen && <DeleteChatModal
                onClose={() => setIsDeleteModalOpen(false)}
                chat={chat}
            />}
        </Card>
    );
};

export default ChatItem;
