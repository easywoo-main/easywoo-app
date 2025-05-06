import React, { useState } from "react";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
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

    const handleUploadFiles = async (files: File[]) => {
        setIsLoading(true);
        try {
            const newFiles = await uploadFiles(files);
            setValue("files", [...watch("files") || [], ...newFiles]);
            console.log(watch("files"))
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
                            {watch("files")?.map((file: File, index: number) => {
                                // Ensure file is a valid File object
                                if (file instanceof File) {
                                    const fileUrl = URL.createObjectURL(file);
                                    return file.type.match(/\.(jpeg|jpg|gif|png)$/) ? (
                                        <img key={index} src={fileUrl} alt="preview" style={{ maxWidth: 100 }} />
                                    ) : file.type.match(/\.(mp4|webm|ogg)$/) ? (
                                        <video key={index} controls width={200}>
                                            <source src={fileUrl} />
                                        </video>
                                    ) : file.type.match(/\.(mp3|wav|ogg)$/) ? (
                                        <audio key={index} controls>
                                            <source src={fileUrl} />
                                        </audio>
                                    ) : null;
                                } else {
                                    console.error("Invalid file object:", file);
                                    return null;  // Handle invalid file objects
                                }
                            })}
                        </Stack>
                    </>
                )}
            />
        </Box>
    );
};

export default NewFilesForm;
