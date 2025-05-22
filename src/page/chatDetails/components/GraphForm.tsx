import React from "react";
import {Box, Typography} from "@mui/material";
import {Control, Controller, FieldErrors} from "react-hook-form";
import ControlTextField from "../../../components/ControlTextField";

interface CustomFormProps {
    control: Control<any>;
    errors: FieldErrors<any>;
}

const GraphForm: React.FC<CustomFormProps> = ({control, errors}) => {
    return (
        <Box>

        </Box>
    );
};

export default GraphForm;