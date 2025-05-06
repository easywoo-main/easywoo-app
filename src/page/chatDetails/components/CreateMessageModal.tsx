import React, {useState} from "react";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import {ChatMessage, MessageType} from "../../../type/chatMessage";
import {defaultCreateMessage} from "../constants";
import NewDefaultMessagePropsForm from "./NewDefaultMessagePropsForm";
import NewFilesForm from "./NewFilesForm";
import NewChallengeForm from "./NewChallengeForm";
import NewSliderForm from "./NewSliderForm";
import {useForm, Controller} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
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