import React, { JSX } from "react";
import { FormHelperText } from "@mui/material";
import { Controller, Control, FieldValues } from "react-hook-form";
import { ControllerRenderProps } from "react-hook-form/dist/types/controller";
import { uploadFiles } from "../api/chatMessage.service";

interface TherapistFormProps<T> {
    control: Control;
    errors: any;
    name: string;
    render: (
        uploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void,
        field: ControllerRenderProps<FieldValues, string>
    ) => JSX.Element;
    method: "single" | "array";
    folder?: string;
}

const ControlFileForm = <T,>({
                                 control,
                                 errors,
                                 name,
                                 render,
                                 method,
                                 folder,
                             }: TherapistFormProps<T>) => {
    const handleFileChange = async (
        files: File[],
        field: ControllerRenderProps<FieldValues, string>
    ) => {
        if (files.length > 0) {
            try {
                const newFiles = await uploadFiles(files, folder);
                field.onChange(method === "single" ? newFiles[0] : newFiles);
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
                            <FormHelperText error>{errors?.[name]?.message}</FormHelperText>
                        )}
                    </>
                );
            }}
        />
    );
};

export default ControlFileForm;
