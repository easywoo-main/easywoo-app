import React, {useEffect, useState} from 'react';
import {Chat, UpdateChatDto} from '../../../type/chat.type';
import {updateChat} from "../../../api/chat.service";
import ChatModal from './ChatModal';
import {CircularProgress, Dialog} from "@mui/material";
import {getAllMessageSlidersByMessageId} from "../../../api/messageSliderProps";
import {SliderProp} from "../../../type/messageSlider.type";

interface EditChatModalProps {
    chat: Chat;
    onClose: () => void;
    onSubmit: (chat: Chat) => void;
}

const EditChatModal: React.FC<EditChatModalProps> = ({chat, onClose, onSubmit}) => {
    const [sliderProps, setSliderProps] = useState<SliderProp[]>([]);
    const [loading, setLoading] = useState(false);

    const handleGetSliderProps = async () => {
        setLoading(true);
        try {
            const sliderProps = await getAllMessageSlidersByMessageId(chat.id);
            setSliderProps(sliderProps);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    const handleSave = async (data: UpdateChatDto) => {
        const updatedChat = await updateChat(chat!.id, data);
        onSubmit(updatedChat)
    };

    useEffect(() => {
        handleGetSliderProps()
    }, [chat]);

    if (loading) {
        return <CircularProgress size={24}/>
    }
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
                    formula: chat.formula,
                    graphType: chat.graphType,
                    paintPoints: chat.paintPoints,
                    masterGraph: chat.masterGraph,
                    sliderProps: sliderProps?.map(slider => ({
                        id: slider.id,
                        name: slider.name,
                        text: slider.text,
                        type: slider.type,
                        negativeMessage: slider.negativeMessage,
                        positiveMessage: slider.positiveMessage
                    })), therapistAvatar: chat.therapistAvatar, therapistName: chat.therapistName
                }}
            />)}
        </Dialog>
    );
};

export default EditChatModal;
