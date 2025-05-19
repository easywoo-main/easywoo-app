import React, {useState} from "react";
import {Box, Button, CircularProgress, IconButton, Stack, Typography} from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import ControlFileForm from "../../../components/ControlFileForm";
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";
import {Control, FieldValues} from "react-hook-form";

interface Props {
    control: any;
    errors: any;
}

const FilesForm: React.FC<Props> = ({control, errors}) => {
    const [isLoading, setIsLoading] = useState(false);


    const handleDeleteFile = (files: ControllerRenderProps, fileToDelete: string) => {
        files.onChange(files.value.filter((file: string) => file !== fileToDelete))
    };

    return (
        <ControlFileForm control={control} errors={errors} name="files"
                         method="array"
                         render={(handleUpload, files: ControllerRenderProps<FieldValues, string>) => (<>
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
                                 {files.value && files.value?.map((file: string, index: number) => (file ? (
                                     <Box key={index} display="flex" alignItems="center">
                                         {file.match(/\.(jpeg|jpg|gif|png)$/) ? (<img src={file} alt="preview"
                                                                                      style={{
                                                                                          maxWidth: 100,
                                                                                          marginRight: 10
                                                                                      }}/>) : file.match(/\.(mp4|webm|ogg)$/) ? (
                                             <video controls width={200} style={{marginRight: 10}}>
                                                 <source src={file}/>
                                             </video>) : file.match(/\.(mp3|wav|ogg)$/) ? (
                                             <audio controls style={{marginRight: 10}}>
                                                 <source src={file}/>
                                             </audio>) : (<Typography color="error" style={{marginRight: 10}}>Unsupported
                                             file type</Typography>)}

                                         <IconButton onClick={() => handleDeleteFile(files, file)}>
                                             <DeleteIcon color="error"/>
                                         </IconButton>
                                     </Box>) : null))}
                             </Stack>
                         </>)}/>
    );
};

export default FilesForm;
