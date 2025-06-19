import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextField } from "@mui/material";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import {errorParsing} from "../utils/errorParsing";

interface ControllerTextFieldProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    errors: FieldErrors<TFieldValues>;
    name: Path<TFieldValues>;
    label: string;
    placeholder?: string;
}

function ControlTextField<TFieldValues extends FieldValues>({
                                                                control,
                                                                errors,
                                                                name,
                                                                label,
                                                                placeholder,
                                                            }: ControllerTextFieldProps<TFieldValues>) {
    const errorValue = errorParsing(name, errors)
    // const errorValue = name
    //     .split(/[\[\]\.]+/)
    //     .filter(Boolean)
    //     .reduce((acc: FieldValues, part: string) => acc?.[part], errors);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextField
                    fullWidth
                    label={label}
                    {...field}
                    error={!!errorValue}
                    helperText={errorValue?.message ?? ""}
                    sx={{ marginBottom: 2, marginTop: 2 }}
                    placeholder={placeholder}
                />
            )}
        />
    );
}

export default ControlTextField;
