import React from "react";
import {
    Box, Button, CircularProgress, Dialog,
    DialogActions, DialogContent, DialogTitle,
    TextField, Stack, Typography
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { uploadFiles } from "../../../api/chatMessage.service";
import {createUpdateAnswerSchema, CreateUpdateAnswerType} from "../../../schema/createUpdateAnswer.schema";
import {CreateUpdateAnswerFrom} from "../type";


interface AnswerModalProps {
    answer?: CreateUpdateAnswerType;
    onClose: () => void;
    saveMessage: (messageChoice: CreateUpdateAnswerFrom) => void;
    onDelete?: () => void;
}

const AnswerModal: React.FC<AnswerModalProps> = ({answer, onClose, saveMessage, onDelete }) => {
    const [isFileLoading, setIsFileLoading] = React.useState(false);
    const [isSaveLoading, setIsSaveLoading] = React.useState(false);
    const [error, setError] = React.useState<string>();

    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<CreateUpdateAnswerFrom>({
        resolver: yupResolver(createUpdateAnswerSchema) as any,
        defaultValues: answer
    });

    const handleUploadFile = async (file: File) => {
        setIsFileLoading(true);
        try {
            const uploadedFiles = await uploadFiles([file]);
            setValue("file", uploadedFiles[0]);
        } catch (error) {
            setError('An error occurred while uploading the file.');
            console.error(error);
        } finally {
            setIsFileLoading(false);
        }
    };

    const handleSave = async (data: CreateUpdateAnswerFrom) => {
        setIsSaveLoading(true);
        try {
            await saveMessage(data);
            onClose();
        } catch (error) {
            setError('An error occurred while saving the answer.');
            console.error(error);
        } finally {
            setIsSaveLoading(false);
        }
    };

    const watchedFile = watch("file");

    return (
        <Dialog open onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{"Answer Step"}</DialogTitle>
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
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                    </Box>
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<UploadFileIcon />}
                    >
                        {isFileLoading ? <CircularProgress size={24} /> : "Upload File"}
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
                        {watchedFile && (
                            watchedFile.match(/\.(jpeg|jpg|gif|png)$/) ? (
                                <img src={watchedFile} alt="preview" style={{ maxWidth: 100 }} />
                            ) : watchedFile.match(/\.(mp4|webm|ogg)$/) ? (
                                <video controls width={200}>
                                    <source src={watchedFile} />
                                </video>
                            ) : watchedFile.match(/\.(mp3|wav|ogg)$/) ? (
                                <audio controls>
                                    <source src={watchedFile} />
                                </audio>
                            ) : (
                                <Typography color="error">Unsupported file type</Typography>
                            )
                        )}
                    </Stack>
                </Box>
            </DialogContent>

            {error && <Typography color="error" align="center">{error}</Typography>}

            <DialogActions>
                {onDelete && (
                    <Button onClick={onDelete} color="error">
                        Delete
                    </Button>
                )}
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={()=> {
                    // console.log(watch())
                    // console.log(errors)
                    // handleSubmit(handleSave)
                    handleSave(watch())
                }} variant="contained" disabled={isSaveLoading}>
                    {isSaveLoading ? <CircularProgress size={24} /> : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AnswerModal;
