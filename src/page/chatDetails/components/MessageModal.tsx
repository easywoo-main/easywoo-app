import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {createUpdateMessageSchema, CreateUpdateMessageType} from "../../../schema/createUpdateMessage.schema";
import {
    Button,
    Chip,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography
} from "@mui/material";
import DefaultMessagePropsForm from "./DefaultMessagePropsForm";
import FilesForm from "./FilesForm";
import ChallengeForm from "./ChallengeForm";
import InfoPopUpForm from "./InfoPopUpForm";
import {User} from "../../../type/user.type";
import {AxiosError} from "axios";
import ControlTextField from "../../../components/ControlTextField";
import ControlCheckbox from "../../../components/ControlCheckbox";

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

    const {control,handleSubmit, formState: {errors}} = useForm<CreateUpdateMessageType>({
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
                    {/*<Box mb={2}>*/}
                    {/*<Typography variant="subtitle1">Message Type</Typography>*/}
                    {/*<Controller*/}
                    {/*    name="type"*/}
                    {/*    control={control}*/}
                    {/*    render={({ field }) => (*/}
                    {/*        <RadioGroup*/}
                    {/*            row*/}
                    {/*            {...field}*/}
                    {/*        >*/}
                    {/*            {Object.values(MessageType).map((messageType) => (*/}
                    {/*                <FormControlLabel*/}
                    {/*                    key={messageType}*/}
                    {/*                    value={messageType}*/}
                    {/*                    control={<Radio />}*/}
                    {/*                    label={messageType}*/}
                    {/*                />*/}
                    {/*            ))}*/}
                    {/*        </RadioGroup>*/}
                    {/*    )}*/}
                    {/*/>*/}
                    {/*</Box>*/}
                    <ControlTextField control={control} errors={errors} name="stepName" label="Step Name"/>
                    <ControlTextField control={control} errors={errors} name="step" label="Step"/>
                    <ControlTextField control={control} errors={errors} name="introText" label="Intro Text"/>
                    <FilesForm control={control} errors={errors} title="IntroFile" name="introFile"/>

                    <ControlTextField control={control} errors={errors} name="text" label="Message Text"/>
                    {/*<ControlCheckbox control={control} name="isCheckpoint"*/}
                    {/*                 label="Is Checkpoint" />*/}
                    <ControlCheckbox control={control} name="isOfferRestart"
                                     label="Is Offer restart"/>
                    <ControlCheckbox control={control} name="isComment"
                                     label="Is Comment"/>
                    <FilesForm control={control} errors={errors} name="files"/>
                    <ChallengeForm errors={errors} control={control}/>
                    {/*{watch("type") === MessageType.QUESTION_SLIDERS && <SliderForm control={control} errors={errors}/>}*/}
                    <InfoPopUpForm control={control} errors={errors}/>

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