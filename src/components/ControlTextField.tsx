import React from "react";
import {Controller} from "react-hook-form";
import {TextField} from "@mui/material";

interface ControllerTextFieldProps {
    control: any;
    errors: any;
    name: string;
    label: string;
    placeholder?: string;
}

const ControlTextField: React.FC<ControllerTextFieldProps> = ({control, errors, name, label, placeholder}) => {

    const errorValue = name.split(/[\[\]\.]+/).filter(Boolean).reduce((acc, part) => acc?.[part], errors);

    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => (
                <TextField
                    fullWidth
                    label={label}
                    {...field}
                    error={!!errorValue}
                    helperText={errorValue?.message}
                    sx={{marginBottom: 2, marginTop: 2}}
                    placeholder={placeholder}
                />
            )}
        />
    );
}

export default ControlTextField;
