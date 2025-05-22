import React from "react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import { Controller, Control, FieldErrors, Path, FieldValues } from "react-hook-form";

interface ControlSelectProps<TFieldValues extends FieldValues, TEnum> {
    control: Control<TFieldValues>;
    errors: FieldErrors<TFieldValues>;
    name: Path<TFieldValues>;
    label: string;
    options: TEnum[];
}

function ControlSelect<TFieldValues extends FieldValues, TEnum extends string | number>({
                                                                                            control,
                                                                                            errors,
                                                                                            name,
                                                                                            label,
                                                                                            options
                                                                                        }: ControlSelectProps<TFieldValues, TEnum>) {
    return (
        <FormControl fullWidth error={!!errors[name]} variant="outlined" size="small" sx={{mt: 2, mb: 2}}>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        labelId={`${name}-label`}
                        label={label}
                        fullWidth
                        error={!!errors[name]}
                    >
                        {options.map((type) => (
                            <MenuItem key={type} value={type}>
                                {type.toString().charAt(0).toUpperCase() + type.toString().slice(1).toLowerCase()}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
        </FormControl>
    );
}

export default ControlSelect;
