import React from 'react';
import {Dialog} from '@mui/material';
import {createChat} from "../../../api/chat.service";
import ChatModal from "./ChatModal";
import {Chat, CreateChatDto} from "../../../type/chat.type";


interface CreateChatModalProps {
    onClose: () => void;
    onSubmit: (data: Chat) => void;
}

const CreateChatModal: React.FC<CreateChatModalProps> = ({ onClose, onSubmit }) => {
    const handleSave = async (data: CreateChatDto) => {
        const chat = await createChat(data);
        onSubmit(chat)
        onClose();
    };

    const defaultChat: CreateChatDto = {
        masterGraph: "",
        name: '',
        price: 0,
        freeSteps: 0,
        landingUrl: '',
        hasIndividualConsultation: false,
        isDisabled: false,
        sliderProps: [],
        therapistAvatar: "",
        therapistName: "",
        formula: "",
        paintPoints: []
    };

    return (
        <Dialog open onClose={onClose}>
            <ChatModal
                onClose={onClose}
                onSubmit={handleSave}
                chat={defaultChat}
            />
        </Dialog>
    );
};

export default CreateChatModal;
