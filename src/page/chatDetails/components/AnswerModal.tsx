import React from "react";
import {Button, CircularProgress, DialogContent, DialogTitle, Stack, Typography} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {uploadFiles} from "../../../api/chatMessage.service";
import {createUpdateAnswerSchema} from "../../../schema/createUpdateAnswer.schema";
import {CreateMessageChoiceDto} from "../../../type/messageChoice.type";
import ControlTextField from "../../../components/ControlTextField";

interface AnswerModalProps {
    answer?: CreateMessageChoiceDto;
    onClose: () => void;
    saveMessage: (messageChoice: CreateMessageChoiceDto) => Promise<void>;
    onDelete?: () => void;
}

const AnswerModal: React.FC<AnswerModalProps> = ({answer, onClose, saveMessage, onDelete }) => {
    const [isFileLoading, setIsFileLoading] = React.useState(false);
    const [isSaveLoading, setIsSaveLoading] = React.useState(false);
    const [error, setError] = React.useState<string>();

    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<CreateMessageChoiceDto>({
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

    const handleSave = async (data: CreateMessageChoiceDto) => {
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
    // console.log(errors)

    return (
        <>
            <DialogTitle>{"Answer"}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(handleSave)}>
                    {/*<ControlTextField control={control} errors={errors} name="name" label="Message name" />*/}
                    <ControlTextField control={control} errors={errors} name="text" label="Message text" />
                    <ControlTextField control={control} errors={errors} name="infoText" label="Message info"/>

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
                        {watchedFile &&  (
                            watchedFile.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                                <img src={watchedFile} alt="preview" style={{ maxWidth: 100 }} />
                            ) : watchedFile.match(/\.(mp4|webm|ogg)$/i) ? (
                                <video controls width={200}>
                                    <source src={watchedFile} />
                                </video>
                            ) : watchedFile.match(/\.(mp3|wav|ogg)$/i) ? (
                                <audio controls>
                                    <source src={watchedFile} />
                                </audio>
                            ) : (
                                <Typography color="error">Unsupported file type</Typography>
                            )
                        )}
                    </Stack>
                    {error && <Typography color="error" align="center">{error}</Typography>}

                    {onDelete && (
                        <Button onClick={onDelete} color="error">
                            Delete
                        </Button>
                    )}
                    <Button onClick={onClose} color="secondary">Cancel</Button>
                    <Button type="submit" variant="contained" disabled={isSaveLoading}>
                        {isSaveLoading ? <CircularProgress size={24} /> : "Save"}
                    </Button>
                </form>
            </DialogContent>
        </>
    );
};

export default AnswerModal;
