import React from "react";
import {
    Box, Button, CircularProgress, Dialog,
    DialogActions, DialogContent, DialogTitle, TextField, Stack, Typography
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {uploadFiles} from "../../../api/chatMessage.service";
import {MessageChoice} from "../../../type/messageChoice.type";
import {updateMessageChoice} from "../../../api/messageChoice.service";
import {useForm, Controller} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Message text cannot be empty.'),
    file: Yup.string().optional()
});

interface EditAnswerModalProps {
    answer: MessageChoice;
    onClose: () => void;
    onSubmit: (messageChoice: MessageChoice) => void
}

const EditAnswerModal: React.FC<EditAnswerModalProps> = ({answer, onClose, onSubmit}) => {
    const [isFileLoading, setIsFileLoading] = React.useState(false);
    const [isSaveLoading, setIsSaveLoading] = React.useState(false);
    const [file, setFile] = React.useState(answer.file);
    const [error, setError] = React.useState<string>();

    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: answer.name,
            file: answer.file
        }
    });

    const handleUploadFile = async (file: File) => {
        setIsFileLoading(true);
        try {
            const uploadedFiles = await uploadFiles([file]);
            setValue("file", uploadedFiles[0]);
            setFile(uploadedFiles[0])        } catch (error) {
            setError('An error occurred while uploading the file.');
            console.error(error);
        } finally {
            setIsFileLoading(false);
        }
    };

    const handleSave = async (data: any) => {
        setIsSaveLoading(true);
        try{
            const updatedMessageChoice = await updateMessageChoice(answer.id, data);
            onSubmit(updatedMessageChoice)
            onClose();
        } catch (error) {
            setError('An error occurred while updating the chat.');
            console.error(error);
        } finally {
            setIsSaveLoading(false);
        }
    };

    return (
        <Dialog open onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Edit Answer Step</DialogTitle>
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
                        {file && (
                            file.match(/\.(jpeg|jpg|gif|png)$/) ? (
                                <img src={file} alt="preview" style={{maxWidth: 100}}/>
                            ) : file.match(/\.(mp4|webm|ogg)$/) ? (
                                <video controls width={200}>
                                    <source src={file}/>
                                </video>
                            ) : file.match(/\.(mp3|wav|ogg)$/) ? (
                                <audio controls>
                                    <source src={file}/>
                                </audio>
                            ) : null
                        )}
                    </Stack>
                </Box>
            </DialogContent>

            {error && <Typography color="error" align="center">{error}</Typography>}

            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={()=> {
                    console.log("errors", errors)
                    console.log("entity", watch())
                    handleSubmit(handleSave)
                }} variant="contained" disabled={isSaveLoading}>
                    {isSaveLoading ? <CircularProgress size={24} /> : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditAnswerModal;
