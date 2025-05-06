import React from "react";
import {createMessageChoice} from "../../../api/messageChoice.service";
import {MessageChoice} from "../../../type/messageChoice.type";
import AnswerModal from "./AnswerModal";
import {defaultCreateAnswer} from "../constants";
import {CreateUpdateAnswerFrom} from "../type";

interface CreateAnswerModalProps {
    onClose: () => void;
    onSubmit: (messageChoice: MessageChoice) => void;
    prevMessageId: string;
}

const CreateAnswerModal: React.FC<CreateAnswerModalProps> = ({onClose, onSubmit, prevMessageId}) => {
    const handleSave = async (data: CreateUpdateAnswerFrom) => {
        const newMessageChoice = await createMessageChoice({...data, prevMessageId});
        onSubmit(newMessageChoice);
    };

    return (
        <AnswerModal
            onClose={onClose}
            saveMessage={handleSave}
            answer={defaultCreateAnswer}
        />

    );
};

export default CreateAnswerModal;
