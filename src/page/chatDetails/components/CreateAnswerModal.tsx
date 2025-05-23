import React from "react";
import {createMessageChoice} from "../../../api/messageChoice.service";
import {CreateMessageChoiceDto, MessageChoice} from "../../../type/messageChoice.type";
import AnswerModal from "./AnswerModal";
import {defaultCreateAnswer} from "../constants";
import Dialog from "@mui/material/Dialog";

interface CreateAnswerModalProps {
    onClose: () => void;
    onSubmit: (messageChoice: MessageChoice) => void;
    prevMessageId: string;
}

const CreateAnswerModal: React.FC<CreateAnswerModalProps> = ({onClose, onSubmit, prevMessageId}) => {
    const handleSave = async (data: CreateMessageChoiceDto) => {
        const newMessageChoice = await createMessageChoice({...data, prevMessageId});
        onSubmit(newMessageChoice);
    };

    return (<Dialog open onClose={onClose} maxWidth="md" fullWidth>
            <AnswerModal
                onClose={onClose}
                saveMessage={handleSave}
                answer={defaultCreateAnswer}
            />
        </Dialog>
    );
};

export default CreateAnswerModal;
