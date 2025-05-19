import React from "react";
import {Avatar} from "@mui/material";
import ControlFileForm from "../../../components/ControlFileForm";

interface TherapistFormProps {
    control: any;
    errors: any;
    name: string;
}

const TherapistAvatar: React.FC<TherapistFormProps> = ({
                                                           control, errors, name,
                                                       }) => {

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
                        alt="Therapist Avatar"
                        sx={{width: 140, height: 140}}
                    />
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