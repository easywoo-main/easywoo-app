import React from "react";
import {MessageChoice} from "../../../type/messageChoice.type";
import {updateMessageChoice} from "../../../api/messageChoice.service";
import AnswerModal from "./AnswerModal";

interface EditAnswerModalProps {
    answer: MessageChoice;
    onClose: () => void;
    onSubmit: (messageChoice: MessageChoice) => void
}

const EditAnswerModal: React.FC<EditAnswerModalProps> = ({answer, onClose, onSubmit}) => {
    const handleSave = async (data: any) => {
        const updatedMessageChoice = await updateMessageChoice(answer.id, data);
        onSubmit(updatedMessageChoice)
    };

    return (
        <AnswerModal
            onClose={onClose}
            saveMessage={handleSave}
            answer={answer}
        />
    );
};

export default EditAnswerModal;
