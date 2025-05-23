import React from "react";
import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {Checkbox, FormControlLabel} from "@mui/material";

interface ControllerControllerCheckboxProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label: string;
}
function ControlCheckbox<TFieldValues extends FieldValues>({control, name, label}: ControllerControllerCheckboxProps<TFieldValues>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => (
                <FormControlLabel
                    control={<Checkbox {...field} />}
                    label={label}
                />
            )}
        />
    )
}

export default ControlCheckbox;