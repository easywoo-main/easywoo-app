import React, { useState } from "react";
import {Box, Button, CircularProgress, Stack, Typography} from "@mui/material";
import { Controller } from "react-hook-form";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { uploadFiles } from "../../../api/chatMessage.service";

interface Props {
    control: any;
    errors: any;
    setValue: any;
    watch: any;
}

const NewFilesForm: React.FC<Props> = ({ control, errors, setValue, watch }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState<string[]>([]);

    const handleUploadFiles = async (files: File[]) => {
        setIsLoading(true);
        try {
            const newFiles = await uploadFiles(files);
            setValue("files", [...watch("files") || [], ...newFiles]);
            setFiles((prev)=> [...prev, ...newFiles])
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box>
            <Controller
                name="files"
                control={control}
                render={({ field }) => (
                    <>
                        <Button
                            variant="outlined"
                            component="label"
                            startIcon={<UploadFileIcon />}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} />
                            ) : (
                                "Upload Files"
                            )}
                            <input
                                type="file"
                                hidden
                                multiple
                                onChange={(e) => {
                                    handleUploadFiles(e.target.files ? Array.from(e.target.files) : []);
                                }}
                            />
                        </Button>

                        <Stack direction="row" spacing={2} mt={2} flexWrap="wrap">
                            {files && files.map((file) => (
                                file ? (
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
                                ) : null
                            ))}
                        </Stack>
                        {errors.files && <Typography color="error" align="center">{errors.files}</Typography>}

                    </>
                )}
            />
        </Box>
    );
};

export default NewFilesForm;
