import React from 'react';
import { Chat } from '../../../type/chat.type';

interface DeleteChatModalProps {
    chat: Chat;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteChatModal: React.FC<DeleteChatModalProps> = ({ chat, onClose, onDelete }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">Delete Chat</h2>
                <p className="mb-4">Are you sure you want to delete the chat "{chat.name}"?</p>
                <div className="flex justify-between">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteChatModal;
