import React, {useEffect, useState} from "react";
import {Box, TextField, MenuItem, Select, InputLabel} from "@mui/material";
import { TIME_IN_SECOND, TimeUnit} from "../../../utils/constant.utils";

interface Props {
    errors: any;
    setValue: any;
}


const NewChallengeForm: React.FC<Props> = ({ errors, setValue}) => {
    const [unit, setUnit] = useState<TimeUnit>(TimeUnit.SECONDS);
    const [timeout, setTimeoutState] = useState<number>(0);

    const handleTimeoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        console.log(Number(e.target.value))
        setTimeoutState(Number(e.target.value));
    };

    const handleUnitChange = (e: any) => {
        setUnit(e.target.value as TimeUnit);
    };

    useEffect(() => {
        setValue("timeout", timeout * TIME_IN_SECOND[unit])
    }, [unit, timeout]);

    return (
        <Box>
            <TextField
                label="Timeout Value"
                type="number"
                fullWidth
                margin="normal"
                value={timeout}
                onChange={handleTimeoutChange}
                error={!!errors.timeout}
                helperText={errors.timeout ? errors.timeout.message : ''}
            />
            <InputLabel>Unit</InputLabel>
            <Select value={unit} onChange={handleUnitChange} label="Unit">
                <MenuItem value={TimeUnit.SECONDS}>Seconds</MenuItem>
                <MenuItem value={TimeUnit.MINUTES}>Minutes</MenuItem>
                <MenuItem value={TimeUnit.HOURS}>Hours</MenuItem>
                <MenuItem value={TimeUnit.DAYS}>Days</MenuItem>
            </Select>
        </Box>
    );
};

export default NewChallengeForm;
