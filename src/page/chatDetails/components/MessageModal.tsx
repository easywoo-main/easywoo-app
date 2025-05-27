import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {createUpdateMessageSchema} from "../../../schema/createUpdateMessage.schema";
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
import FilesForm from "./FilesForm";
import ChallengeForm from "./ChallengeForm";
import {User} from "../../../type/user.type";
import {AxiosError} from "axios";
import ControlTextField from "../../../components/ControlTextField";
import ControlCheckbox from "../../../components/ControlCheckbox";
import {MessageChoice} from "../../../type/messageChoice.type";
import {ChatMessage, CreateChatMessageDto, MessageType} from "../../../type/chatMessage";
import ControlSelect from "../../../components/ControlSelect";
import VariableForm from "./VariableForm";
import ControlArrayForm from "../../../components/ControlArrayForm";
import ControlArrayTextField from "../../../components/ControlArrayTextField";

interface MessageModalProps {
    onClose: () => void;
    saveMessage: (message: CreateChatMessageDto) => Promise<void>;
    message: CreateChatMessageDto;
    onDelete?: () => void;
    users?: User[];
    messageChoices?: MessageChoice[];
    nextMessage?: ChatMessage;

    chatMessageId?: string;
    chatId: string;
}

const MessageModal: React.FC<MessageModalProps> = ({
                                                       onClose,
                                                       saveMessage,
                                                       message,
                                                       onDelete,
                                                       users,
                                                       chatMessageId,
                                                       messageChoices,
                                                       nextMessage,
                                                       chatId
                                                   }) => {
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [error, setError] = useState<string>();

    const {control,handleSubmit, formState: {errors}} = useForm<CreateChatMessageDto>({
        resolver: yupResolver(createUpdateMessageSchema) as any,
        defaultValues: message
    });

    const handleSave = async (data: CreateChatMessageDto) => {
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
                    {chatMessageId && <Typography>Message Step with id: {chatMessageId}</Typography>}
                    <ControlTextField control={control} errors={errors} name="stepName" label="Step Name"/>
                    <ControlTextField control={control} errors={errors} name="introText" label="Intro Text"/>
                    <FilesForm control={control} errors={errors} title="Intro Images" name="introImages"/>
                    <FilesForm control={control} errors={errors} title={"Intro Media "} name="introMedias"/>
                    <ControlTextField control={control} errors={errors} name="question" label="Question"/>
                    <ControlCheckbox control={control} name="isCourseEnd" label="Is Course End"/>
                    <ControlCheckbox control={control} name="isOfferRestart" label="Is Offer restart"/>
                    <ControlCheckbox control={control} name="isComment" label="Is Comment"/>
                    <ControlSelect control={control} errors={errors} name="type" options={Object.values(MessageType)}
                                   label="Message type"/>
                    <VariableForm control={control} chatId={chatId}  />
                    <Typography>Files</Typography>
                    <FilesForm control={control} errors={errors} name="images" title="Upload Image"/>
                    <FilesForm control={control} errors={errors} name="medias" title="Upload Media"/>
                    <ChallengeForm errors={errors} control={control}/>
                    {/*<InfoPopUpForm control={control} errors={errors} />*/}
                    {/*<Typography component="span">To-do</Typography>*/}
                    <ControlArrayTextField control={control} errors={errors} name="todoList" label="Todo List"/>

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