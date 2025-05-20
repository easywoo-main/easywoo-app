import React, { useEffect, useState } from "react";
import { Box, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { TimeUnit, TIME_IN_SECOND } from "../../../utils/constant.utils";

interface TimeoutInputProps {
    value: number;
    onChange: (valueInSeconds: number) => void;
    error?: boolean;
    helperText?: string;
    label?: string;
}

const TimeoutInput: React.FC<TimeoutInputProps> = ({
                                                       value,
                                                       onChange,
                                                       error = false,
                                                       helperText = "",
                                                       label = "Timeout",
                                                   }) => {
    const [unit, setUnit] = useState<TimeUnit>(TimeUnit.SECONDS);
    const [displayValue, setDisplayValue] = useState<number>(0);

    useEffect(() => {
        if (value != null && !isNaN(value)) {
            const units = [TimeUnit.DAYS, TimeUnit.HOURS, TimeUnit.MINUTES, TimeUnit.SECONDS];
            for (const u of units) {
                if (value % TIME_IN_SECOND[u] === 0) {
                    setUnit(u);
                    setDisplayValue(value / TIME_IN_SECOND[u]);
                    return;
                }
            }
            setUnit(TimeUnit.SECONDS);
            setDisplayValue(value);
        }
    }, [value]);

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        if (!isNaN(val)) {
            setDisplayValue(val);
            onChange(val * TIME_IN_SECOND[unit]);
        } else {
            setDisplayValue(0);
            onChange(0);
        }
    };

    const handleUnitChange = (e: SelectChangeEvent<TimeUnit>) => {
        const newUnit = e.target.value as TimeUnit;
        setUnit(newUnit);
        onChange(displayValue * TIME_IN_SECOND[newUnit]);
    };

    return (
        <Box>
            <TextField
                label={label}
                type="number"
                value={displayValue}
                onChange={handleValueChange}
                error={error}
                helperText={helperText}
                fullWidth
                sx={{ marginBottom: 2, marginTop: 2 }}
            />
            <InputLabel id="timeout-unit-label">Unit</InputLabel>
            <Select
                labelId="timeout-unit-label"
                value={unit}
                onChange={handleUnitChange}
                fullWidth
            >
                <MenuItem value={TimeUnit.SECONDS}>Seconds</MenuItem>
                <MenuItem value={TimeUnit.MINUTES}>Minutes</MenuItem>
                <MenuItem value={TimeUnit.HOURS}>Hours</MenuItem>
                <MenuItem value={TimeUnit.DAYS}>Days</MenuItem>
            </Select>
        </Box>
    );
};

export default TimeoutInput;
