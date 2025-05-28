import React, {useState} from "react";
import {
    ChatMessage,
    ChatMessageDto,
    ChatMessageWithPrevMessage,
    ChatMessageWithRelations
} from "../../../type/chatMessage";
import {deleteChatMessage, updateChatMessage} from "../../../api/chatMessage.service";
import MessageModal from "./MessageModal";
import {Dialog} from "@mui/material";
import DeleteModal from "../../../components/DeleteModal";

interface EditMessageModalProps {
    onClose: () => void;
    onSubmit: (newMessage: ChatMessage) =>  Promise<void> | void;
    message: ChatMessageWithRelations;
}

const EditMessageModal: React.FC<EditMessageModalProps> = ({onClose, onSubmit, message}) => {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const handleSave = async (data: any) => {
        const newChatMessage = await updateChatMessage(message.id, data);
        await onSubmit(newChatMessage);
        onClose();
    };

    const handleDeleteMessage = async () => {
        const deletedMessage = await deleteChatMessage(message.id)
        await onSubmit(deletedMessage);
        onClose();
    }


    return (<Dialog open onClose={onClose} maxWidth="md" fullWidth>
                <MessageModal
                    saveMessage={handleSave}
                    onClose={onClose}
                    onDelete={() => setIsOpenDeleteModal(true)}
                    chatMessageId={message.id}
                    chatId={message.chatId}
                    message={{
                        stepName: message.stepName,
                        introText: message.introText || '',
                        introImages: message.introImages || [],
                        introMedias: message.introMedias || [],
                        question: message.question || '',
                        todoList: message.todoList || [],
                        images: message.images || [],
                        medias: message.medias || [],
                        timeouts: message.timeouts,
                        type: message.type,
                        isCourseEnd: message.isCourseEnd,
                        isOfferRestart: message.isOfferRestart,
                        isAllowManualTime: message.isAllowManualTime,
                        isComment: message.isComment,
                        isBarometer: message.isBarometer,
                        stepId: message.stepId,
                        nextMessageId: message.nextMessageId,
                        chatId: message.chatId,
                        sliderPropIds: message.sliderProps?.map(item => (item.id)) || [],
                        answers: []
                    }}
                />
        {isOpenDeleteModal &&
            <DeleteModal
                onDelete={handleDeleteMessage}
                onClose={() => setIsOpenDeleteModal(false)}
                title="Delete Answer"
                content={`Are you sure you want to delete the message ${message.stepName}?`}
            />}

        </Dialog>
    );
};

export default EditMessageModal;
