import React from "react";
import {ChatMessage, CreateChatMessageDto} from "../../../type/chatMessage";
import {defaultCreateMessage} from "../constants";
import {createChatMessage} from "../../../api/chatMessage.service";
import MessageModal from "./MessageModal";
import Dialog from "@mui/material/Dialog";

interface Props {
    onClose: () => void;
    chatId: string;
    onSubmit?: (newMessage: ChatMessage) => void | Promise<void>;
    startingChatId?: string;
    createMessage?: CreateChatMessageDto;
}

const CreateMessageModal: React.FC<Props> = ({
                                                 onClose,
                                                 onSubmit,
                                                 chatId,
                                                 startingChatId,
                                                 createMessage
                                             }) => {
    const handleSave = async (data: any) => {
        data.chatId = chatId;
        data.startingChatId = startingChatId
        // data.prevMessageIds = prevMessageId ? [prevMessageId] : [];
        // data.prevChoiceIds = prevChoiceId ? [prevChoiceId] : [];
        const newChatMessage = await createChatMessage(data);
        if (onSubmit) {
            await onSubmit(newChatMessage);
        }
        onClose()
    };

    return (<Dialog open onClose={onClose} maxWidth="md" fullWidth>
            <MessageModal message={createMessage || defaultCreateMessage} saveMessage={handleSave} onClose={onClose} chatId={chatId} />
        </Dialog>
    );
};

export default CreateMessageModal;