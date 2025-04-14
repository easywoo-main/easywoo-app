// src/pages/ChatListPage.tsx
import React, { useEffect, useState } from 'react';
import { Chat } from '../../type/chat.type';
import { deleteChat, getPaginationChat } from '../../api/chat.service';
import Search from './components/Search';
import ChatItem from './components/ChatItem';
import CreateChatModal from './components/CreateChatModal';
import EditChatModal from './components/EditChatModal';
import DeleteChatModal from './components/DeleteChatModal';
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
                setChats(chats.filter((chat) => chat.id !== selectedChat.id)); // Remove the deleted chat from the list
                setShowDeleteModal(false); // Close the delete modal
            } catch (error) {
                console.error('Error deleting chat', error);
            }
        }
    };

    return (
        <div className="chat-list-container">
            <h1 className="chat-list-title">Chat List</h1>

            <button
                onClick={() => setShowCreateModal(true)}
                className="chat-create-button"
            >
                Create Chat
            </button>

            {/* Search Component */}
            <Search query={searchQuery} onSearch={setSearchQuery} />

            {loading ? (
                <div className="chat-loading">Loading...</div>
            ) : (
                <div className="chat-items">
                    {chats.map((chat) => (
                        <ChatItem
                            key={chat.id}
                            chat={chat}
                            onEditDetailsClick={handleEditClick}
                            onDeleteClick={handleDeleteClick}
                        />
                    ))}
                </div>
            )}

            <div className="pagination-container">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    Previous Page
                </button>

                <span className="pagination-info">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    Next Page
                </button>
            </div>

            {showCreateModal && <CreateChatModal onClose={() => setShowCreateModal(false)} />}
            {showEditModal && selectedChat && <EditChatModal chat={selectedChat} onClose={() => setShowEditModal(false)} />}
            {showDeleteModal && selectedChat && (
                <DeleteChatModal
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDelete}
                    chat={selectedChat}
                />
            )}
        </div>
    );
};

export default ChatListPage;
