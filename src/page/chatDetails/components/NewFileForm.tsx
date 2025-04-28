import React from "react";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { CreateUpdateChatMessageDto } from "../type";
import { uploadFiles } from "../../../api/chatMessage.service";
import NewTextForm from "./NewTextForm";
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface Props {
    message: CreateUpdateChatMessageDto;
    setMessage: (message: CreateUpdateChatMessageDto) => void;
}

const NewFileForm: React.FC<Props> = ({ message, setMessage }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const handleUploadFiles = async (files: File[]) => {
        setIsLoading(true);
        try{
            const uploadedFiles = await uploadFiles(files);
            setMessage({ ...message, files: message.files.concat(uploadedFiles) });
        }finally {
            setIsLoading(false);
        }
    };

    return (
        <Box>
            <NewTextForm message={message} setMessage={setMessage} />
            <Button
                variant="outlined"
                component="label"
                startIcon={<UploadFileIcon />}
            >
                {isLoading ? (
                    <CircularProgress size={24} />
                ) : (
                    <>
                        Upload Files
                        <input
                            type="file"
                            hidden
                            multiple
                            onChange={(e) => {
                                handleUploadFiles(e.target.files ? Array.from(e.target.files) : []);
                            }}
                        />
                    </>
                )}
            </Button>

            <Stack direction="row" spacing={2} mt={2} flexWrap="wrap">
                {message.files.map((fileUrl, index) => {
                    if (fileUrl.match(/\.(jpeg|jpg|gif|png)$/)) {
                        return <img key={index} src={fileUrl} alt={`preview-${index}`} style={{ maxWidth: 100 }} />;
                    } else if (fileUrl.match(/\.(mp4|webm|ogg)$/)) {
                        return (
                            <video key={index} controls width={200}>
                                <source src={fileUrl} />
                            </video>
                        );
                    } else if (fileUrl.match(/\.(mp3|wav|ogg)$/)) {
                        return (
                            <audio key={index} controls>
                                <source src={fileUrl} />
                            </audio>
                        );
                    }
                    return null;
                })}
            </Stack>
        </Box>
    );
};

export default NewFileForm;
