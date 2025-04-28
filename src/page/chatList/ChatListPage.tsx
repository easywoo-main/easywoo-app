import React, { useEffect, useState } from 'react';
import { Chat } from '../../type/chat.type';
import { deleteChat, getPaginationChat } from '../../api/chat.service';
import Search from './components/Search';
import ChatItem from './components/ChatItem';
import CreateChatModal from './components/CreateChatModal';
import EditChatModal from './components/EditChatModal';
import DeleteChatModal from './components/DeleteChatModal';
import { Button, CircularProgress, Typography, Box, Alert } from '@mui/material';
import './ChatListPage.css';

const ChatListPage: React.FC = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const pageSize = 10;

    const fetchChats = async (pageNumber: number, search: string = '') => {
        setLoading(true);
        try {
            const data = await getPaginationChat({ pageNumber, pageSize, search });
            setChats(data.content);
            setTotalPages(data.pageCount);
        } catch (error) {
            console.error('Error fetching chats', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChats(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

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

    const handleEditClick = (chat: Chat) => {
        setSelectedChat(chat);
        setShowEditModal(true);
    };

    const handleDeleteClick = (chat: Chat) => {
        setSelectedChat(chat);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (selectedChat) {
            try {
                await deleteChat(selectedChat.id);
                setChats(chats.filter((chat) => chat.id !== selectedChat.id));
                setShowDeleteModal(false);
                await fetchChats(currentPage, searchQuery);
            } catch (error) {
                console.error('Error deleting chat', error);
            }
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
                sx={{ marginBottom: 2 }}
            >
                Create Chat
            </Button>

            <Search query={searchQuery} onSearch={setSearchQuery} />

            {loading ? (
                <CircularProgress />
            ) : (
                <Box className="chat-items">
                    {chats.map((chat) => (
                        <ChatItem
                            key={chat.id}
                            chat={chat}
                            onEditDetailsClick={handleEditClick}
                            onDeleteClick={handleDeleteClick}
                        />
                    ))}
                </Box>
            )}

            <Box className="pagination-container" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    variant="outlined"
                    sx={{ marginRight: 2 }}
                >
                    Previous Page
                </Button>

                <Typography variant="body1" sx={{ marginX: 2 }}>
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

            {showCreateModal && <CreateChatModal onClose={async () => {
                await fetchChats(currentPage, searchQuery);
                setShowCreateModal(false);
            } }/>}
            {showEditModal && selectedChat && <EditChatModal chat={selectedChat} onClose={() => setShowEditModal(false)} />}
            {showDeleteModal && selectedChat && (
                <DeleteChatModal
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDelete}
                    chat={selectedChat}
                />
            )}
        </Box>
    );
};

export default ChatListPage;
