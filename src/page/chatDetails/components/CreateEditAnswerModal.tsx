import React from "react";
import {
    Box, Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Radio,
    RadioGroup, Stack, TextField,
    Typography
} from "@mui/material";
import {MessageType} from "../../../type/chatMessage";
import NewDefaultMessagePropsForm from "./NewDefaultMessagePropsForm";
import NewFilesForm from "./NewFilesForm";
import NewChallengeForm from "./NewChallengeForm";
import {CreateUpdateAnswerDto} from "../type";
import {defaultCreateAnswer, defaultCreateMessage} from "../constants";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {uploadFiles} from "../../../api/chatMessage.service";

interface CreateEditAnswerModalProps {
    answer?: CreateUpdateAnswerDto | null;
    onSubmit: (step: CreateUpdateAnswerDto) => void;
    onClose: () => void;
}

const CreateEditAnswerModal: React.FC<CreateEditAnswerModalProps> = ({answer, onSubmit, onClose}) => {
    const initialAnswer = answer ?? defaultCreateAnswer;
    const [isLoading, setIsLoading] = React.useState(false);
    const [newAnswer, setNewAnswer] = React.useState<CreateUpdateAnswerDto>(initialAnswer);

    const handleUploadFile = async (file: File) => {
        setIsLoading(true);
        try {
            const uploadedFiles = await uploadFiles([file]);
            setNewAnswer((prevState) => ({...prevState, file: uploadedFiles[0]}));
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        await onSubmit(newAnswer);
        onClose();
    }
    return (
        <Dialog open onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Create/Edit Answer Step</DialogTitle>
            <DialogContent>
                <Box>
                    <Box my={2}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            label="Message Text"
                            value={newAnswer.name}
                            onChange={(e) => setNewAnswer({...newAnswer, name: e.target.value})}
                        />
                    </Box> <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadFileIcon/>}
                >
                    {isLoading ? (
                        <CircularProgress size={24}/>
                    ) : (
                        <>
                            Upload File
                            <input
                                type="file"
                                hidden
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        handleUploadFile(e.target.files[0]);
                                    }
                                }}
                            />
                        </>
                    )}
                </Button>
                    <Stack direction="row" spacing={2} mt={2} flexWrap="wrap">
                        {newAnswer.file && (
                            newAnswer.file.match(/\.(jpeg|jpg|gif|png)$/) ? (
                                <img src={newAnswer.file} alt="preview" style={{maxWidth: 100}}/>
                            ) : newAnswer.file.match(/\.(mp4|webm|ogg)$/) ? (
                                <video controls width={200}>
                                    <source src={newAnswer.file}/>
                                </video>
                            ) : newAnswer.file.match(/\.(mp3|wav|ogg)$/) ? (
                                <audio controls>
                                    <source src={newAnswer.file}/>
                                </audio>
                            ) : null
                        )}
                    </Stack>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
}


export default CreateEditAnswerModal