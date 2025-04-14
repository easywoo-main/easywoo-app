import React from 'react';
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
        <div className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 transition duration-200">
            <h2 className="text-xl font-semibold">{chat.name}</h2>
            <p className="text-sm text-gray-600">Created on: {new Date(chat.createdAt).toLocaleDateString()}</p>
            <div className="mt-2 flex">
                <button
                    onClick={() => onEditDetailsClick(chat)}
                    className="text-blue-500 mr-4"
                >
                    Edit Name
                </button>
                <button
                    onClick={() => navigate(`/chat/${chat.id}`)}
                    className="text-blue-500 mr-4"
                >
                    Edit Message
                </button>
                <button
                    onClick={() => onDeleteClick(chat)}
                    className="text-red-500"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ChatItem;
