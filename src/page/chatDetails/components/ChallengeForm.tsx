import React from "react";
import {Box, Typography} from "@mui/material";
import ControlCheckbox from "../../../components/ControlCheckbox";
import {Control, Controller, FieldErrors} from "react-hook-form";
import TimeoutInput from "./TimeoutInput";

interface ChallengeFormProps {
    control: Control<any>;
    errors: FieldErrors<any>;
}

const ChallengeForm: React.FC<ChallengeFormProps> = ({control, errors}) => {
    return (
        <Box>
            <Typography variant="h6">Suggested time interval :</Typography>
            <Controller
                name="timeout"
                control={control}
                rules={{required: "Timeout is required", min: {value: 1, message: "Must be positive"}}}
                render={({field}) => (
                    <TimeoutInput
                        {...field}
                        error={!!errors.timeout}
                        helperText={errors.timeout?.message as string}
                    />
                )}
            />

            <ControlCheckbox
                control={control}
                name="isAllowManualTime"
                label="Allow manual time"
            />
        </Box>
    );
};

export default ChallengeForm;
