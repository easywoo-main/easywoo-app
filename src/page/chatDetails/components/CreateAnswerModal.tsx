import React from "react";
import {
    Box, Button, CircularProgress, Dialog,
    DialogActions, DialogContent, DialogTitle, TextField, Stack, Typography
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { uploadFiles } from "../../../api/chatMessage.service";
import { createMessageChoice } from "../../../api/messageChoice.service";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MessageChoice } from "../../../type/messageChoice.type";
import {
    createUpdateAnswerSchema,
    CreateUpdateAnswerType
} from "../../../schema/createUpdateAnswer.schema";

interface CreateAnswerModalProps {
    onClose: () => void;
    onSubmit: (messageChoice: MessageChoice) => void;
    prevMessageId: string;
}

const CreateAnswerModal: React.FC<CreateAnswerModalProps> = ({ onClose, onSubmit, prevMessageId }) => {
    const [isFileLoading, setIsFileLoading] = React.useState(false);
    const [isSaveLoading, setIsSaveLoading] = React.useState(false);
    const [error, setError] = React.useState<string>();
    const [file, setFile] = React.useState<string>();

    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<CreateUpdateAnswerType>({
        resolver:  yupResolver(createUpdateAnswerSchema) as any,
        defaultValues: {
            name: '',
        }
    });

    const handleUploadFile = async (file: File) => {
        setIsFileLoading(true);
        try {
            const uploadedFiles = await uploadFiles([file]);
            setValue("file", uploadedFiles[0]);
            setFile(uploadedFiles[0]);
        } catch (error) {
            setError('An error occurred while uploading the file.');
            console.error(error);
        } finally {
            setIsFileLoading(false);
        }
    };

    const handleSave = async (data: CreateUpdateAnswerType) => {
        setIsSaveLoading(true);
        try {
            data.prevMessageId = prevMessageId;
            const newMessageChoice = await createMessageChoice(data);
            onSubmit(newMessageChoice);
            onClose();
        } catch (error) {
            setError('An error occurred while creating the answer.');
            console.error(error);
        } finally {
            setIsSaveLoading(false);
        }
    };

    return (
        <Dialog open onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Create Answer Step</DialogTitle>
            <DialogContent>
                <Box>
                    <Box my={2}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    label="Message Text"
                                    {...field}
                                    error={!!errors.name}
                                    helperText={errors.name ? errors.name.message : ''}
                                />
                            )}
                        />
                    </Box>
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<UploadFileIcon />}
                    >
                        {isFileLoading ? <CircularProgress size={24}/> : "Upload File"}
                        <input
                            type="file"
                            hidden
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    handleUploadFile(e.target.files[0]);
                                }
                            }}
                        />
                    </Button>
                    <Stack direction="row" spacing={2} mt={2} flexWrap="wrap">
                        {file ? (
                            file.match(/\.(jpeg|jpg|gif|png)$/) ? (
                                <img src={file} alt="preview" style={{ maxWidth: 100 }} />
                            ) : file.match(/\.(mp4|webm|ogg)$/) ? (
                                <video controls width={200}>
                                    <source src={file} />
                                </video>
                            ) : file.match(/\.(mp3|wav|ogg)$/) ? (
                                <audio controls>
                                    <source src={file} />
                                </audio>
                            ) : (
                                <Typography color="error">Unsupported file type</Typography>
                            )
                        ) : null}
                    </Stack>
                </Box>
            </DialogContent>

            {error && <Typography color="error" align="center">{error}</Typography>}

            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit(handleSave)} variant="contained" disabled={isSaveLoading}>
                    {isSaveLoading ? <CircularProgress size={24} /> : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateAnswerModal;
