import React from "react";
import {Typography} from "@mui/material";
import ControlTextField from "../../../components/ControlTextField";
import TherapistAvatar from "./TherapistAvatar";

interface TherapistFormProps {
    control: any;
    errors: any;
}

const TherapistForm: React.FC<TherapistFormProps> = ({
                                                         control,
                                                         errors,
                                                     }) => {

    return (
        <div>
            <Typography variant="h5" sx={{mt:3}}>Therapist Details</Typography>
            <TherapistAvatar control={control} errors={errors} name="therapistAvatar"/>
            <ControlTextField control={control} errors={errors} name="therapistName" label="Therapist Name"/>
        </div>
    );
};

export default TherapistForm;
