import React from "react";
import { Box, Typography, FormHelperText } from "@mui/material";
import ControlTextField from "../../../components/ControlTextField";
import { Control, FieldValues, UseFormStateReturn } from "react-hook-form";
import FileForm from "./FileForm";

interface AnswerFormProps {
    control: any;
    errors: UseFormStateReturn<FieldValues>["errors"];
    warnings?: any;

    label?: string;
    name?: string;
}

const getFieldName = (fieldName: string, baseName?: string) => {
    if (baseName) {
        return `${baseName}.${fieldName}`;
    }
    return fieldName;
};


const AnswerForm: React.FC<AnswerFormProps> = ({
                                                   control,
                                                   errors,
                                                   label,
                                                   warnings,
                                                   name,
                                               }) => {
    const warning = getFieldName("goToStep", name)
        .split(/[\[\]\.]+/)
        .filter(Boolean)
        .reduce((acc, part: string) => acc?.[part], warnings);
    return (
        <Box>
            {label && <Typography>{label}</Typography>}
            <ControlTextField
                control={control}
                errors={errors}
                name={getFieldName("text", name)}
                label={`${label} Answer `}
            />
            <ControlTextField
                control={control}
                errors={errors}
                name={getFieldName("infoText", name)}
                label={`${label} Help text`}
            />
            <FileForm control={control} errors={errors} title={"Answer Media "} name={getFieldName("file", name)}/>

            <ControlTextField
                control={control}
                errors={errors}
                name={getFieldName("goToStep", name)}
                label={`${label} Go to step`}
            />
            <FormHelperText sx={{color: 'orange'}}>
                {warning}
            </FormHelperText>
        </Box>
    );
};

export default AnswerForm;
