import React from "react";
import {ChatMessage} from "../../../type/chatMessage";
import {defaultCreateMessage} from "../constants";
import {createChatMessage} from "../../../api/chatMessage.service";
import MessageModal from "./MessageModal";

interface Props {
    onClose: () => void;
    onSubmit: (newMessage: ChatMessage) => void;
    chatId?: string;
    prevMessageId?: string;
    prevChoiceId?: string;
}

const CreateMessageModal: React.FC<Props> = ({onClose, onSubmit, chatId, prevMessageId, prevChoiceId}) => {
    const handleSave = async (data: any) => {
        data.chatId = chatId;
        data.prevMessageId = prevMessageId;
        data.prevChoiceId = prevChoiceId;
        const newChatMessage = await createChatMessage(data);
        onSubmit(newChatMessage);
    };

    return (
        <MessageModal message={defaultCreateMessage} saveMessage={handleSave} onClose={onClose}/>
    );
};

export default CreateMessageModal;