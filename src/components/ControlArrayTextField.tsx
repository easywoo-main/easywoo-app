import React from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import {Controller, Control, FieldErrors, useFieldArray, Path, FieldValues, ArrayPath} from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import ControlArrayForm from "./ControlArrayForm";

interface ControlArrayTextFieldProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    errors: FieldErrors<TFieldValues>;
    name: Path<TFieldValues>;
    label: string;

}

function ControlArrayTextField<TFieldValues extends FieldValues>({
                                                                control,
                                                                errors,
                                                                name,
                                                                label,
                                                            }: ControlArrayTextFieldProps<TFieldValues>) {

    return (
        <ControlArrayForm control={control} errors={errors} name={name} label={label} render={
            (field, label)=> (
                <TextField
                {...field}
                label={label}
                variant="outlined"
                fullWidth
                // error={!!errors?.[name]?.[index]}
                // helperText={errors?.[name]?.[index] ? (errors[name][index] as any)?.message : ""}
            />)
        } />
    );
}

export default ControlArrayTextField;
