import React from "react";
import {ChatMessage} from "../../../type/chatMessage";
import {defaultCreateMessage} from "../constants";
import {createChatMessage} from "../../../api/chatMessage.service";
import MessageModal from "./MessageModal";
import Dialog from "@mui/material/Dialog";

interface Props {
    onClose: () => void;
    chatId: string;
    onSubmit?: (newMessage: ChatMessage) => void | Promise<void>;
    prevMessageId?: string;
    prevChoiceId?: string;
    startingChatId?: string;
}

const CreateMessageModal: React.FC<Props> = ({
                                                 onClose,
                                                 onSubmit,
                                                 chatId,
                                                 prevMessageId,
                                                 prevChoiceId,
                                                 startingChatId
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
            <MessageModal message={defaultCreateMessage} saveMessage={handleSave} onClose={onClose} chatId={chatId} />
        </Dialog>
    );
};

export default CreateMessageModal;