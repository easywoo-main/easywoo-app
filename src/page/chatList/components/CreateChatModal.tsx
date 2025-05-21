import React from 'react';
import {Dialog} from '@mui/material';
import {createChat} from "../../../api/chat.service";
import ChatModal from "./ChatModal";
import {CreateUpdateChatDto, GraphType} from "../../../type/chat.type";


interface CreateChatModalProps {
    onClose: () => void;
}

const CreateChatModal: React.FC<CreateChatModalProps> = ({ onClose }) => {
    const handleSave = async (data: CreateUpdateChatDto) => {
        await createChat(data);
        onClose();
    };

    const defaultChat: CreateUpdateChatDto = {
        name: '',
        price: 0,
        freeSteps: 0,
        landingUrl: '',
        hasIndividualConsultation: false,
        isDisabled: false,
        sliderProps: [],
        therapistAvatar: "",
        therapistName: "",
        graphType: GraphType.LINE,
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
