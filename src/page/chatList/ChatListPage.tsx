import React, {useEffect, useState} from 'react';
import {Chat} from '../../type/chat.type';
import {getPaginationChat} from '../../api/chat.service';
import Search from './components/Search';
import ChatItem from './components/ChatItem';
import CreateChatModal from './components/CreateChatModal';
import {Button, CircularProgress, Typography, Box} from '@mui/material';
import './ChatListPage.css';

const ChatListPage: React.FC = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const pageSize = 10;

    const fetchChats = async () => {
        setLoading(true);
        try {
            const data = await getPaginationChat({pageNumber: currentPage, pageSize, search: searchQuery});
            setChats(data.content);
            setTotalPages(data.pageCount);
        } catch (error) {
            console.error('Error fetching chats', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChats();
    }, [currentPage, searchQuery]);


    const handleCreateNewChat = async () => {
        await fetchChats();
        setShowCreateModal(false);
    }
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <Box className="chat-list-container">
            <Typography variant="h4" gutterBottom>
                Chat List
            </Typography>

            <Button
                onClick={() => setShowCreateModal(true)}
                variant="contained"
                color="primary"
                sx={{marginBottom: 2}}
            >
                Create Chat
            </Button>

            <Search query={searchQuery} onSearch={setSearchQuery}/>

            {loading ? (
                <CircularProgress/>
            ) : (
                <Box className="chat-items">
                    {chats.map((chat) => (
                        <ChatItem
                            key={chat.id}
                            chat={chat}
                        />
                    ))}
                </Box>
            )}

            <Box className="pagination-container"
                 sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    variant="outlined"
                    sx={{marginRight: 2}}
                >
                    Previous Page
                </Button>

                <Typography variant="body1" sx={{marginX: 2}}>
                    Page {currentPage} of {totalPages}
                </Typography>

                <Button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    variant="outlined"
                >
                    Next Page
                </Button>
            </Box>
            {showCreateModal && <CreateChatModal onClose={handleCreateNewChat}/>}
        </Box>
    );
};

export default ChatListPage;
