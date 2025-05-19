import React from "react";
import {Avatar} from "@mui/material";
import ControlFileForm from "../../../components/ControlFileForm";
import {Control, FieldValues, Path} from "react-hook-form";
import {FieldErrors} from "react-hook-form/dist/types/errors";

interface TherapistFormProps<TFieldValues extends FieldValues > {
    control: Control<TFieldValues>;
    errors: FieldErrors<TFieldValues>;
    name: Path<TFieldValues>;
}

function TherapistAvatar <TFieldValues extends FieldValues>({
                                                           control, errors, name,
                                                       }:TherapistFormProps<TFieldValues> ){

    return (
        <ControlFileForm
            control={control}
            name={name}
            errors={errors}
            method="single"
            render={(uploadFile, field) => (
                <label htmlFor="avatar-upload" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar
                        src={field.value}
                        sx={{ width: 140, height: 140 }}
                    >
                    </Avatar>
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={uploadFile}
                    />
                </label>
            )}
        />
    );
};

export default TherapistAvatar;