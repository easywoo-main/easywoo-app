import React, {useState} from "react";
import {MessageChoice} from "../../../type/messageChoice.type";
import {deleteMessageChoice, updateMessageChoice} from "../../../api/messageChoice.service";
import AnswerModal from "./AnswerModal";
import DeleteModal from "../../../components/DeleteModal";

interface EditAnswerModalProps {
    answer: MessageChoice;
    onClose: () => void;
    onSubmit: (messageChoice: MessageChoice) => void
}

const EditAnswerModal: React.FC<EditAnswerModalProps> = ({answer, onClose, onSubmit}) => {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const handleDeleteMessage = async () => {
        const deletedMessage = await deleteMessageChoice(answer.id)
        onSubmit(deletedMessage);
        onClose();
    }


    const handleSave = async (data: any) => {
        const updatedMessageChoice = await updateMessageChoice(answer.id, data);
        onSubmit(updatedMessageChoice)
    };

    return (
        <>
            <AnswerModal
                onClose={onClose}
                saveMessage={handleSave}
                answer={{
                    name: answer.name,
                    file: answer.file,
                    prevMessageId: answer.prevMessageId,
                }}
            />
            {isOpenDeleteModal &&
                <DeleteModal
                    onDelete={handleDeleteMessage}
                    onClose={() => setIsOpenDeleteModal(false)}
                    title="Delete Answer"
                    content='Are you sure you want to delete the answer "{answer.name}?'
                />
            }
        </>

    );
};

export default EditAnswerModal;
