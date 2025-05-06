import React from "react";
import { TextField, Box, FormControlLabel, Checkbox } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
    control: any;
    errors: any;
}

const NewDefaultMessagePropsForm: React.FC<Props> = ({ control, errors }) => {
    return (
        <Box my={2}>
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        multiline
                        minRows={3}
                        label="Message Text"
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ''}
                    />
                )}
            />

            <Controller
                name="isCheckpoint"
                control={control}
                render={({ field }) => (
                    <FormControlLabel
                        control={<Checkbox {...field} />}
                        label="Is Checkpoint"
                    />
                )}
            />
        </Box>
    );
};

export default NewDefaultMessagePropsForm;
