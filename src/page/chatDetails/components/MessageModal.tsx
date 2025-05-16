import {MessageType} from "../../../type/chatMessage";
import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {createUpdateMessageSchema, CreateUpdateMessageType} from "../../../schema/createUpdateMessage.schema";
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Radio,
    RadioGroup,
    Stack,
    Typography
} from "@mui/material";
import DefaultMessagePropsForm from "./DefaultMessagePropsForm";
import FilesForm from "./FilesForm";
import ChallengeForm from "./ChallengeForm";
import SliderForm from "./SliderForm";
import InfoPopUpForm from "./InfoPopUpForm";
import {User} from "../../../type/user.type";

interface MessageModalProps {
    onClose: () => void;
    saveMessage: (message: CreateUpdateMessageType) => Promise<void>;
    message: CreateUpdateMessageType;
    onDelete?: () => void;
    users?: User[];
}

const MessageModal: React.FC<MessageModalProps> = ({onClose, saveMessage, message, onDelete, users}) => {
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [error, setError] = useState<string>();

    const {control, formState: {errors}, setValue, watch} = useForm<CreateUpdateMessageType>({
        resolver: yupResolver(createUpdateMessageSchema) as any,
        defaultValues: message
    });

    const handleSave = async (data: CreateUpdateMessageType) => {
        setIsSaveLoading(true);
        try {
            await saveMessage(data);
            onClose();
        } catch (error) {
            setError('An error occurred while creating the message.');
            console.error(error);
        } finally {
            setIsSaveLoading(false);
        }
    };

    return (
        <>
            <DialogTitle>Message Step</DialogTitle>
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

                <DefaultMessagePropsForm control={control} errors={errors} />

                {watch("type") === MessageType.FILE && <FilesForm control={control} errors={errors} setValue={setValue} watch={watch} />}
                {watch("type") === MessageType.CHALLENGE && <ChallengeForm errors={errors} setValue={setValue} />}
                {/*{watch("type") === MessageType.QUESTION_SLIDERS && <SliderForm control={control} errors={errors}/>}*/}
                <InfoPopUpForm control={control} errors={errors} />

                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {users?.map((user) => (
                        <Chip
                            key={user.id}
                            label={user.name}
                            // onDelete={() => removeUser(user.id)}
                            sx={{mb: 1}}
                        />
                    ))}
                </Stack>
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
        </>
    );
};

export default MessageModal;