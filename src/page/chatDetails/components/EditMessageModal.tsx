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
import {ChatMessage, ChatMessageWithRelations, MessageType} from "../../../type/chatMessage";
import {defaultCreateMessage} from "../constants";
import NewDefaultMessagePropsForm from "./NewDefaultMessagePropsForm";
import NewFilesForm from "./NewFilesForm";
import NewChallengeForm from "./NewChallengeForm";
import NewSliderForm from "./NewSliderForm";
import {useForm, Controller} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {createChatMessage, updateChatMessage} from "../../../api/chatMessage.service";
import {SliderPropType} from "../../../type/messageSlider.type";
import MessageModal from "./MessageModal";

interface EditMessageModalProps {
    onClose: () => void;
    onSubmit: (newMessage: ChatMessage) => void;
    message: ChatMessageWithRelations;
}

const EditMessageModal: React.FC<EditMessageModalProps> = ({onClose, onSubmit, message}) => {
    const handleSave = async (data: any) => {
        const newChatMessage = await updateChatMessage(message.id, data);
        onSubmit(newChatMessage);
        onClose();
    };

    return (
        <MessageModal message={{
            name: message.name,
            type: message.type,
            isCheckpoint: message.isCheckpoint,
            files: message.files,
            timeout: message.timeout,
            sliderProps: message.sliderProps?.map((item) => {
                return {id: item.id, name: item.name, type: item.type}
            }),
        }} saveMessage={handleSave} onClose={onClose}/>
    );
};

export default EditMessageModal;
