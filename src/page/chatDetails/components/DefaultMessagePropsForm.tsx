import React from "react";
import { TextField, Box, FormControlLabel, Checkbox } from "@mui/material";
import { Controller } from "react-hook-form";
import ControlTextField from "../../../components/ControlTextField";
import ControlCheckbox from "../../../components/ControlCheckbox";

interface Props {
    control: any;
    errors: any;
}

const DefaultMessagePropsForm: React.FC<Props> = ({ control, errors }) => {
    return (
        <Box my={2}>
            <ControlTextField control={control} errors={errors} name="introText" label="Intro Text"/>

            <ControlTextField control={control} errors={errors} name="text" label="Message Text"/>


            <ControlCheckbox control={control} name="isCheckpoint"
                             label="Is Checkpoint"/>
            <ControlCheckbox control={control} name="isOfferRestart"
                             label="Is Offer restart"/>
        </Box>
    );
};

export default DefaultMessagePropsForm;
