import React, {JSX} from "react";
import {FormHelperText} from "@mui/material";
import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";
import {uploadFiles} from "../api/chatMessage.service";
import {FieldErrors} from "react-hook-form/dist/types/errors";

interface TherapistFormProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    errors: FieldErrors<TFieldValues>;
    name: Path<TFieldValues>;
    render: (
        uploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>,
        field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
    ) => JSX.Element;
    method: "single" | "array";
    folder?: string;
}

function ControlFileForm<TFieldValues extends FieldValues>({
                                 control,
                                 errors,
                                 name,
                                 render,
                                 method,
                                 folder,
                                                           }: TherapistFormProps<TFieldValues>) {
    const handleFileChange = async (
        files: File[],
        field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
    ) => {
        if (files.length > 0) {
            try {
                const newFiles = await uploadFiles(files, folder);
                field.onChange(method === "single" ? newFiles[0] : [...field.value,  ...newFiles]);
            } catch (error) {
                console.error("Upload failed", error);
            }
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const uploadedFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
                    return handleFileChange(e.target.files ? Array.from(e.target.files) : [], field);
                };
                return (
                    <>
                        {render(uploadedFiles, field)}
                        {errors?.[name] && (
                            <FormHelperText error>{String(errors?.[name]?.message)}</FormHelperText>
                        )}
                    </>
                );
            }}
        />
    );
};

export default ControlFileForm;
