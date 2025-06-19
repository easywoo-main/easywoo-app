import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {createUpdateMessageSchema} from "../../../schema/createUpdateMessage.schema";
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormHelperText,
    Stack,
    Typography
} from "@mui/material";
import FilesForm from "./FilesForm";
import ChallengeForm from "./ChallengeForm";
import {User} from "../../../type/user.type";
import {AxiosError} from "axios";
import ControlTextField from "../../../components/ControlTextField";
import ControlCheckbox from "../../../components/ControlCheckbox";
import {CreateChatMessageDto, MessageType} from "../../../type/chatMessage";
import ControlSelect from "../../../components/ControlSelect";
import VariableForm from "./VariableForm";
import ControlArrayForm from "../../../components/ControlArrayForm";
import ControlArrayTextField from "../../../components/ControlArrayTextField";
import AnswerForm from "./AnswerForm";

interface MessageModalProps {
    onClose: () => void;
    saveMessage: (message: CreateChatMessageDto) => Promise<void>;
    message: CreateChatMessageDto;
    onDelete?: () => void;
    users?: User[];

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
                                                       chatId
                                                   }) => {
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [error, setError] = useState<string>();
    const [warnings, setWarnings] = useState<any>({});
    const {control,handleSubmit,watch, formState: {errors}} = useForm<CreateChatMessageDto>({
        resolver: yupResolver(createUpdateMessageSchema) as any,
        defaultValues: message
    });

    useEffect(() => {
        if (message.goToStep && !message.nextMessageId) {
            setWarnings((prevState: any) => ({...prevState, goToStep: "Go to step invalid"}));
        }
        if (message.restartFrom && !message.restartMessageId) {
            setWarnings((prevState: any) => ({...prevState, restartFrom: "Go to step invalid"}));
        }
        message.answers?.forEach((item, index) => {
            if (!item.goToStep) {

                setWarnings((prevState: any) => ({
                    ...prevState,
                    answers: {
                        ...(prevState.answers || {}),
                        [index]: {
                            ...(prevState.answers?.[index] || {}),
                            goToStep: "Step is missing"
                        }
                    }
                }));
            } else if (!item.nextMessageId) {
                console.log(!item.nextMessageId)
                setWarnings((prevState: any) => ({
                    ...prevState,
                    answers: {
                        ...(prevState.answers || {}),
                        [index]: {
                            ...(prevState.answers?.[index] || {}),
                            goToStep: "Go to step invalid"
                        }
                    }
                }));
            }
        });
    }, [message]);

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
                    <ControlTextField control={control} errors={errors} name="stepId" label="Step id"/>
                    <ControlTextField control={control} errors={errors} name="stepName" label="Step Name"/>
                    <ControlTextField control={control} errors={errors} name="introText" label="Intro Text"/>
                    <FilesForm control={control} errors={errors} title="Intro Images" name="introImages"/>
                    <FilesForm control={control} errors={errors} title={"Intro Media "} name="introMedias"/>
                    <ControlTextField control={control} errors={errors} name="question" label="Question"/>
                    <ControlCheckbox control={control} name="isCourseEnd" label="End of course"/>
                    <ControlCheckbox control={control} name="isOfferRestart" label="Offer restart"/>
                    <ControlCheckbox control={control} name="isComment" label="Leave comment"/>
                    <ControlCheckbox control={control} name="isGraph" label="Show Graph"/>


                    <ControlSelect control={control} errors={errors} name="type" options={Object.values(MessageType)}
                                   label="Message type"/>
                    <VariableForm control={control} chatId={chatId}/>
                    <Typography>Files</Typography>
                    <FilesForm control={control} errors={errors} name="images" title="Upload Image"/>
                    <FilesForm control={control} errors={errors} name="medias" title="Upload Media"/>
                    <ChallengeForm errors={errors} control={control}/>
                    <ControlArrayTextField control={control} errors={errors} name="todoList" label="Todo List"/>
                    <ControlTextField control={control} errors={errors} name="restartFrom" label="Restart from"/>
                    <FormHelperText sx={{color: 'orange'}}>
                        {warnings?.restartFrom}
                    </FormHelperText>
                    <ControlTextField control={control} errors={errors} name="goToStep" label="Go to step"/>
                    <FormHelperText sx={{color: 'orange'}}>
                        {warnings?.goToStep}
                    </FormHelperText>
                    <ControlArrayForm
                        control={control}
                        errors={errors}
                        name="answers"
                        label="Answers"
                        emptyItem={{ text: "", infoText: "" }}
                        render={(_field, label, index) => (<AnswerForm
                            control={control}
                            errors={errors}
                            warnings={warnings}
                            label={label}
                            name={`answers.${index}`}
                        />)}
                    />


                    <Stack direction="row" spacing={1} flexWrap="wrap">
                    {users?.map((user) => (
                        <Chip
                            key={user.id}
                            label={user.name}
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
                    <Button  type="submit" onClick={()=> {
                        console.log("savedChatMessage",watch())
                        console.log("errors", errors)
                    }} variant="contained" disabled={isSaveLoading}>
                        {isSaveLoading ? <CircularProgress size={24} /> : 'Save'}
                    </Button>
                </DialogActions>
                </form>
            </DialogContent>
        </>
    );
};

export default MessageModal;