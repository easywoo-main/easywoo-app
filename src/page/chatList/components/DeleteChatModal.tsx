import React from 'react';
import {Chat} from '../../../type/chat.type';
import {deleteChat} from "../../../api/chat.service";
import DeleteModal from '../../../components/DeleteModal';

interface DeleteChatModalProps {
    chat: Chat;
    onClose: () => void;
    onSubmit: (chat: Chat) => void;
}

const DeleteChatModal: React.FC<DeleteChatModalProps> = ({chat, onClose, onSubmit}) => {
    const handleDeleteChat = async () => {
        if (chat) {
            const deletedChat = await deleteChat(chat.id);
            onSubmit(deletedChat);
            onClose();
        }
    }
    return (
        <DeleteModal
            onClose={onClose}
            onDelete={handleDeleteChat}
            title="Delete chat"
            content="Are you sure you want to delete the chat {chat.name}?"
        />
    );
};

export default DeleteChatModal;
