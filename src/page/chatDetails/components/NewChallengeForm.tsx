import React, {useEffect, useState} from "react";
import {Box, TextField, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent} from "@mui/material";
import {CreateUpdateChatMessageDto} from "../type";

interface Props {
    message: CreateUpdateChatMessageDto;
    setMessage: (message: CreateUpdateChatMessageDto) => void;
}

const NewChallengeForm: React.FC<Props> = ({message, setMessage}) => {
    const [unit, setUnit] = useState<string>('seconds');
    const [timeout, setTimeoutState] = useState<number>(message.timeout ?? 0);


    useEffect(() => {
        const messageTimeout = message.timeout ?? 0
        if (messageTimeout % 86400 === 0) {
            setUnit("days");
            setTimeoutState(messageTimeout / 86400)
        } else if (messageTimeout % 3600 === 0) {
            setUnit("hours");
            setTimeoutState(messageTimeout / 3600)
        } else if (messageTimeout % 60 === 0) {
            setUnit("minutes");
            setTimeoutState(messageTimeout / 60)
        }
    }, []);

    const convertToSeconds = (timeout: number, unit: string): number => {
        console.log(unit)
        if (unit === 'minutes') {
            return timeout * 60;
        } else if (unit === 'hours') {
            return timeout * 3600;
        } else if (unit === 'days') {
            return timeout * 86400;
        }
        return timeout;
    };

    const handleTimeoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const timeoutValue = Number(e.target.value);
        setTimeoutState(timeoutValue);
        const timeoutInSeconds = convertToSeconds(timeoutValue, unit);
        setMessage({...message, timeout: timeoutInSeconds});
        console.log(message)
    };

    const handleUnitChange = (e: SelectChangeEvent<string>) => {
        const unit = e.target.value;
        setUnit(unit);
        const timeoutInSeconds = convertToSeconds(timeout, unit);
        console.log("timeoutInSeconds", timeoutInSeconds, unit)
        setMessage({...message, timeout: timeoutInSeconds});
    };

    return (
        <Box>
            <TextField
                label="Timeout Value"
                type="number"
                fullWidth
                margin="normal"
                value={timeout}
                onChange={handleTimeoutChange}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Unit</InputLabel>
                <Select
                    value={unit}
                    onChange={handleUnitChange}
                    label="Unit"
                >
                    <MenuItem value="seconds">Seconds</MenuItem>
                    <MenuItem value="minutes">Minutes</MenuItem>
                    <MenuItem value="hours">Hours</MenuItem>
                    <MenuItem value="days">Days</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default NewChallengeForm;
