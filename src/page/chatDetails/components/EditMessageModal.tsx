import React, {useState} from "react";
import {ChatMessage, ChatMessageWithRelations} from "../../../type/chatMessage";
import {deleteChatMessage, updateChatMessage} from "../../../api/chatMessage.service";
import MessageModal from "./MessageModal";
import DeleteModal from "../../../components/DeleteModal";

interface EditMessageModalProps {
    onClose: () => void;
    onSubmit: (newMessage: ChatMessage) =>  Promise<void>;
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

    return (
        <>
            <MessageModal
                saveMessage={handleSave}
                onClose={onClose}
                onDelete={() => setIsOpenDeleteModal(true)}
                message={{
                    name: message.name,
                    type: message.type,
                    isCheckpoint: message.isCheckpoint,
                    files: message.files,
                    timeout: message.timeout,
                    sliderProps: message.sliderProps?.map((item) => {
                        return {id: item.id, name: item.name, type: item.type}
                    })|| [],
                    infoPopUps: message.infoPopUps?.map((item)=>{
                        return {id: item.id, title: item.title, description: item.description};
                    }) || []
                }}/>
            {isOpenDeleteModal &&
                <DeleteModal
                    onDelete={handleDeleteMessage}
                    onClose={() => setIsOpenDeleteModal(false)}
                    title="Delete Message"
                    content='Are you sure you want to delete the message "{message.name}?'
                />
            }
        </>
    );
};

export default EditMessageModal;
