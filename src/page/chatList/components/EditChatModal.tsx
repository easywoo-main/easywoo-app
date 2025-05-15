import React, {useEffect, useState} from 'react';
import {Chat, CreateUpdateChatDto} from '../../../type/chat.type';
import {updateChat} from "../../../api/chat.service";
import ChatModal from './ChatModal';
import {Dialog} from "@mui/material";
import {getAllMessageSlidersByMessageId} from "../../../api/messageSliderProps";
import {SliderProp} from "../../../type/messageSlider.type";

interface EditChatModalProps {
    chat: Chat;
    onClose: () => void;
    onSubmit: (chat: Chat) => void;
}

const EditChatModal: React.FC<EditChatModalProps> = ({chat, onClose, onSubmit}) => {
    const [sliderProps, setSliderProps] = useState<SliderProp[]>([]);

    const handleGetSliderProps = async () => {
        const sliderProps = await getAllMessageSlidersByMessageId(chat.id);
        setSliderProps(sliderProps);
    }

    const handleSave = async (data: CreateUpdateChatDto) => {
        const updatedChat = await updateChat(chat!.id, data);
        onSubmit(updatedChat)
    };

    useEffect(() => {
        handleGetSliderProps()
    }, [chat]);
    return (
        <Dialog open onClose={onClose}>
            {chat && sliderProps && (<ChatModal
                onClose={onClose}
                onSubmit={handleSave}
                chat={{
                    name: chat.name,
                    price: chat.price,
                    freeSteps: chat.freeSteps,
                    landingUrl: chat.landingUrl,
                    hasIndividualConsultation: chat.hasIndividualConsultation,
                    isDisabled: chat.isDisabled,
                    sliderProps: sliderProps?.map(slider => ({
                        id: slider.id, name: slider.name, text: slider.text, type: slider.type,
                    })),
                }}
            />)}
        </Dialog>
    );
};

export default EditChatModal;
