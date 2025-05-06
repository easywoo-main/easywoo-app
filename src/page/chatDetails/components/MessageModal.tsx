import {MessageType} from "../../../type/chatMessage";
import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {createUpdateMessageSchema, CreateUpdateMessageType} from "../../../schema/createUpdateMessage.schema";
import {
    Box, Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import NewDefaultMessagePropsForm from "./NewDefaultMessagePropsForm";
import NewFilesForm from "./NewFilesForm";
import NewChallengeForm from "./NewChallengeForm";
import NewSliderForm from "./NewSliderForm";

interface MessageModalProps {
    onClose: () => void;
    saveMessage: (message: CreateUpdateMessageType) => void;
    message: CreateUpdateMessageType;
    onDelete?: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({onClose, saveMessage, message, onDelete}) => {
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [error, setError] = useState<string>();

    const {control, formState: {errors}, setValue, watch} = useForm<CreateUpdateMessageType>({
        resolver: yupResolver(createUpdateMessageSchema) as any,
        defaultValues: message
    });

    const handleSave = async (data: CreateUpdateMessageType) => {
        setIsSaveLoading(true);
        try {
            saveMessage(data);
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
            <DialogTitle>Create Message Step</DialogTitle>
            <DialogContent>
                <Box mb={2}>
                    <Typography variant="subtitle1">Message Type</Typography>
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup
                                row
                                {...field}
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
                        )}
                    />
                </Box>

                <NewDefaultMessagePropsForm control={control} errors={errors} />

                {watch("type") === MessageType.FILE && <NewFilesForm control={control} errors={errors} setValue={setValue} watch={watch} />}
                {watch("type") === MessageType.CHALLENGE && <NewChallengeForm errors={errors} setValue={setValue} />}
                {watch("type") === MessageType.QUESTION_SLIDERS && <NewSliderForm control={control} errors={errors} setValue={setValue} watch={watch}/>}
            </DialogContent>

            {error && <Typography color="error" align="center">{error}</Typography>}

            <DialogActions>
                {onDelete && (
                    <Button onClick={onDelete} color="error">
                        Delete
                    </Button>
                )}
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={()=>{
                    console.log(watch())
                    console.log(errors);
                    // handleSubmit(handleSave) //todo
                    handleSave(watch())
                }} variant="contained" disabled={isSaveLoading}>
                    {isSaveLoading ? <CircularProgress size={24} /> : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MessageModal;