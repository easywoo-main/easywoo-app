import React, {useState} from "react";
import {Box, Button, CircularProgress, IconButton, Stack, Typography} from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import ControlFileForm from "../../../components/ControlFileForm";
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";
import {FieldValues} from "react-hook-form";

interface Props {
    control: any;
    errors: any;
    title?: string;
    name: string;
}

const FileForm: React.FC<Props> = ({control, errors, name, title = "Upload Files"}) => {
    const [isLoading, setIsLoading] = useState(false);


    const handleDeleteFile = (files: ControllerRenderProps, fileToDelete: string) => {
        files.onChange(files.value.filter((file: string) => file !== fileToDelete))
    };
    return (
        <ControlFileForm control={control} errors={errors} name={name}
                         method="single"
                         render={(handleUpload, files: ControllerRenderProps<FieldValues, string>) => (<>
                             <Button
                                 variant="outlined"
                                 component="label"
                                 startIcon={<UploadFileIcon />}
                             >
                                 {isLoading ? (
                                     <CircularProgress size={24} />
                                 ) : (
                                     title
                                 )}
                                 <input
                                     type="file"
                                     hidden
                                     multiple
                                     onChange={async (e: React.ChangeEvent<HTMLInputElement>)=>{
                                         setIsLoading(true);
                                         try {
                                             await handleUpload(e)
                                         } finally {
                                             setIsLoading(false);
                                         }
                                     }}
                                 />
                             </Button>

                             <Stack direction="row" spacing={2} mt={2} flexWrap="wrap">
                                 {files.value ? (
                                     <Box display="flex" alignItems="center">
                                         {files.value .match(/\.(jpeg|jpg|gif|png)$/) ? (<img src={files.value } alt="preview"
                                                                                      style={{
                                                                                          maxWidth: 100,
                                                                                          marginRight: 10
                                                                                      }}/>) : files.value .match(/\.(MP4|MP3|mp4|webm|ogg)$/) ? (
                                             <video controls width={200} style={{marginRight: 10}}>
                                                 <source src={files.value }/>
                                             </video>) : files.value .match(/\.(mp3|wav|ogg)$/) ? (
                                             <audio controls style={{marginRight: 10}}>
                                                 <source src={files.value }/>
                                             </audio>) : (<Typography color="error" style={{marginRight: 10}}>Unsupported
                                             file type</Typography>)}

                                         <IconButton onClick={() => handleDeleteFile(files, files.value )}>
                                             <DeleteIcon color="error"/>
                                         </IconButton>
                                     </Box>) : null}
                             </Stack>
                         </>)}/>
    );
};

export default FileForm;
