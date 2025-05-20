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
import InfoPopUpForm from "./InfoPopUpForm";
import {User} from "../../../type/user.type";
import {AxiosError} from "axios";

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

    const {control,handleSubmit, formState: {errors}, setValue, watch} = useForm<CreateUpdateMessageType>({
        resolver: yupResolver(createUpdateMessageSchema) as any,
        defaultValues: message
    });

    const handleSave = async (data: CreateUpdateMessageType) => {
        setIsSaveLoading(true);
        try {
            await saveMessage(data);
            onClose();
        } catch (err: AxiosError | any) {
            console.log(err?.response?.data?.message);
            setError(err?.response?.data?.message || 'An error occurred while saving.');
        } finally {
            setIsSaveLoading(false);
        }
    };

    return (
        <>
            <DialogTitle>Message Step</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(handleSave)}>
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

                {watch("type") === MessageType.FILE && <FilesForm control={control} errors={errors}  />}
                {watch("type") === MessageType.CHALLENGE && <ChallengeForm errors={errors} control={control}/>}
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
                {error && <Typography color="error" align="center">{error}</Typography>}


                <DialogActions>
                    {onDelete && (
                        <Button onClick={onDelete} color="error">
                            Delete
                        </Button>
                    )}
                    <Button onClick={onClose} color="secondary">Cancel</Button>
                    <Button  type="submit" variant="contained" disabled={isSaveLoading}>
                        {isSaveLoading ? <CircularProgress size={24} /> : 'Save'}
                    </Button>
                </DialogActions>
                </form>
            </DialogContent>
        </>
    );
};

export default MessageModal;