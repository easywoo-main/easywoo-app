import React, {useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import CreateChatModal from './components/CreateChatModal';
import ChatMessagesList from "./components/ChatList";
import {useNavigate} from 'react-router-dom';

const ChatListPage: React.FC = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const navigate = useNavigate();
    return (<Box>
            <Box p={3} display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <Typography variant="h4">Chat List</Typography>
                    <Button
                        onClick={() => setShowCreateModal(true)}
                        variant="contained"
                        color="primary"
                        sx={{mt: 2, mb: 2}}
                    >
                        Create Chat
                    </Button>
                </Box>
                <Button
                    onClick={() => {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        navigate('/login');
                    }}
                    variant="outlined"
                    color="secondary"
                    sx={{ ml: 2 }}
                >
                    Logout
                </Button>
            </Box>

            <ChatMessagesList/>

            {showCreateModal && (<CreateChatModal onClose={() => setShowCreateModal(false)}
                                                  onSubmit={(chat) => navigate(`/chat/${chat.id}`)}/>)}
        </Box>);
};

export default ChatListPage;
