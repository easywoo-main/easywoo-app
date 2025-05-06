import React, { useState } from "react";
import {
    Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Radio, RadioGroup, Typography
} from "@mui/material";
import {ChatMessage, ChatMessageWithRelations, MessageType} from "../../../type/chatMessage";
import { defaultCreateMessage } from "../constants";
import NewDefaultMessagePropsForm from "./NewDefaultMessagePropsForm";
import NewFilesForm from "./NewFilesForm";
import NewChallengeForm from "./NewChallengeForm";
import NewSliderForm from "./NewSliderForm";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {createChatMessage, updateChatMessage} from "../../../api/chatMessage.service";
import {SliderPropType} from "../../../type/messageSlider.type";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Message text cannot be empty."),
    type: Yup.mixed().oneOf(Object.values(MessageType), "Invalid message type").required("Message type is required."),
    isCheckpoint: Yup.boolean().required("Checkpoint status is required."),
    files: Yup.array().of(Yup.string().url()).optional(),
    timeout: Yup.mixed()
        .test("is-bigint", "Timeout must be a bigint", (value) => typeof value === "bigint")
        .optional(),
    sliderProps: Yup.array().of(Yup.object().shape({
        name: Yup.string().required("Slider text cannot be empty."),
        type: Yup.mixed().oneOf(Object.values(SliderPropType), "Invalid slider type").required("Slider type is required."),
    })),
});

interface Props {
    onClose: () => void;
    onSubmit: (newMessage: ChatMessage) => void;
    chatId?: string;
    prevMessageId?: string;
    chatMessage: ChatMessageWithRelations;
}

const EditMessageModal: React.FC<Props> = ({ onClose, onSubmit, chatId, prevMessageId, chatMessage }) => {
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [error, setError] = useState<string>();

    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: chatMessage.name,
            type: chatMessage.type,
            isCheckpoint: chatMessage.isCheckpoint,
            files: chatMessage.files,
            timeout: chatMessage.timeout,
            sliderProps: chatMessage.sliderProps?.map((item) => ({
                name: item.name,
                type: item.type,
            }))
        },
    });

    const handleSave = async (data: any) => {
        setIsSaveLoading(true);
        try {
            data.chatId = chatId;
            data.prevMessageId = prevMessageId;
            const newChatMessage = await updateChatMessage(chatMessage.id, data);
            onSubmit(newChatMessage);
            onClose();
        } catch (error) {
            setError('An error occurred while creating the message.');
            console.error(error);
        } finally {
            setIsSaveLoading(false);
        }
    };

    return (
        <Dialog open onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Edit Message</DialogTitle>
            <DialogContent>
                <Box mb={2}>
                    <Typography variant="subtitle1">Message Type</Typography>
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup row {...field}>
                                {Object.values(MessageType).map((messageType) => (
                                    <FormControlLabel
                                        key={messageType}
                                        value={messageType}
                                        control={<Radio />}
                                        label={messageType}
                                    />
                                ))}
                            </RadioGroup>
                        )}
                    />
                </Box>

                <NewDefaultMessagePropsForm control={control} errors={errors} />

                {watch("type") === MessageType.FILE && <NewFilesForm control={control} errors={errors} setValue={setValue} watch={watch}/>}
                {watch("type") === MessageType.CHALLENGE && <NewChallengeForm setValue={setValue} errors={errors} />}
                {watch("type") === MessageType.QUESTION_SLIDERS && <NewSliderForm control={control} errors={errors} setValue={setValue} watch={watch}/>}
            </DialogContent>

            {error && <Typography color="error" align="center">{error}</Typography>}

            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={()=>{
                    console.log(watch())
                    console.log(errors);
                    handleSubmit(handleSave)
                    console.log("end")
                }} variant="contained" disabled={isSaveLoading}>
                    {isSaveLoading ? <CircularProgress size={24} /> : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditMessageModal;
