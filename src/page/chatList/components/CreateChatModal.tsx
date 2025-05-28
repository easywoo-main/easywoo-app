import React from 'react';
import {Dialog} from '@mui/material';
import {createChat} from "../../../api/chat.service";
import ChatModal from "./ChatModal";
import {CreateChatDto} from "../../../type/chat.type";


interface CreateChatModalProps {
    onClose: () => void;
}

const CreateChatModal: React.FC<CreateChatModalProps> = ({ onClose }) => {
    const handleSave = async (data: CreateChatDto) => {
        await createChat(data);
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
