import React from "react";
import {Controller} from "react-hook-form";
import {Checkbox, FormControlLabel} from "@mui/material";

interface ControllerControllerCheckboxProps {
    control: any;
    name: string;
    label: string;
}
const ControlCheckbox: React.FC<ControllerControllerCheckboxProps> = ({control, name, label}) => {
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