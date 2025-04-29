import React, {useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import {MessageType} from "../../../type/chatMessage";
import {CreateUpdateChatMessageDto} from "../type";
import {defaultCreateMessage} from "../constants";
import NewDefaultMessagePropsForm from "./NewDefaultMessagePropsForm";
import NewFilesForm from "./NewFilesForm";
import NewChallengeForm from "./NewChallengeForm";
import NewSliderForm from "./NewSliderForm";

interface Props {
    onClose: () => void;
    onSubmit: (step: CreateUpdateChatMessageDto) => void;
    message?: CreateUpdateChatMessageDto | null;
}

const CreateEditMessageModal: React.FC<Props> = ({ onClose, onSubmit, message }) => {
    const initialMessage = message ?? defaultCreateMessage;
    const [newMessage, setNewMessage] = useState<CreateUpdateChatMessageDto>(initialMessage);
    const [type, setType] = useState<MessageType>(initialMessage.type!);

    const handleSubmit = () => {
        onSubmit({ ...newMessage, type });
    };

    return (
        <Dialog open onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Create/Edit Message Step</DialogTitle>
            <DialogContent>
                <Box mb={2}>
                    <Typography variant="subtitle1">Message Type</Typography>
                    <RadioGroup
                        row
                        value={type}
                        onChange={(e) => {
                            const selected = e.target.value as MessageType;
                            setType(selected);
                            setNewMessage((prev) => ({ ...prev, type: selected }));
                        }}
                    >
                        {Object.values(MessageType).map((messageType) => (
                            <FormControlLabel
                                key={messageType}
                                value={messageType}
                                control={<Radio />}
                                label={messageType}
                            />
                        ))}
                    </RadioGroup>
                </Box>
                <NewDefaultMessagePropsForm message={newMessage} setMessage={setNewMessage} />

                {type === MessageType.FILE && (
                    <NewFilesForm message={newMessage} setMessage={setNewMessage} />
                )}

                {type === MessageType.CHALLENGE && (
                    <NewChallengeForm message={newMessage} setMessage={setNewMessage} />
                )}

                {type===MessageType.QUESTION_SLIDERS && (
                    <NewSliderForm message={newMessage} setMessage={setNewMessage} />
                )}

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateEditMessageModal;