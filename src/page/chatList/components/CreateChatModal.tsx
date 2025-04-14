import React, { useState } from 'react';
import {createChat} from "../../../api/chat.service";
import {Chat} from "../../../type/chat.type";

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
            onClose(); // Close the modal after successful creation
        } catch (error) {
            setError('An error occurred while creating the chat.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">Create Chat</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter chat name"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="flex justify-between">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !name}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
                    >
                        {loading ? 'Loading...' : 'Create'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateChatModal;
