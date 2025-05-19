import React from "react";
import {Typography} from "@mui/material";
import ControlTextField from "../../../components/ControlTextField";
import TherapistAvatar from "./TherapistAvatar";
import {Control, Path} from "react-hook-form";
import {FieldErrors} from "react-hook-form/dist/types/errors";
import { TherapistFormValues } from "../../../type/chat.type";

interface TherapistFormProps<TFieldValues extends TherapistFormValues > {
    control: Control<TFieldValues>;
    errors: FieldErrors<TFieldValues>;
}


function TherapistForm<TFieldValues extends TherapistFormValues>({
                                                         control,
                                                         errors,
                                                     }: TherapistFormProps<TFieldValues>) {

    return (
        <div>
            <Typography variant="h5" sx={{mt:3}}>Therapist Details</Typography>
            <TherapistAvatar control={control} errors={errors} name={"therapistAvatar" as Path<TFieldValues>}/>
            <ControlTextField<TFieldValues> control={control} errors={errors} name={"therapistName" as Path<TFieldValues>} label="Therapist Name"/>
        </div>
    );
};

export default TherapistForm;
