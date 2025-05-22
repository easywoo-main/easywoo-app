import React from "react";
import { Controller } from "react-hook-form";
import { RadioGroup, FormControlLabel, Radio, Typography, Box } from "@mui/material";
import {MessageType} from "../../../type/chatMessage";

interface MessageTypeSelectorProps {
    control: any;
}

const MessageTypeSelector: React.FC<MessageTypeSelectorProps> = ({ control }) => {
    return (
        <Box mb={2}>
            <Typography variant="subtitle1">Message Type</Typography>
            <Controller
                name="type"
                control={control}
                render={({ field }) => (
                    <RadioGroup row {...field}>
                        {Object.values(MessageType).map((messageType) => (
                            <FormControlLabel
                                key={messageType}
                                value={messageType}
                                control={<Radio />}
                                label={messageType}
                            />
                        ))}
                    </RadioGroup>
                )}
            />
        </Box>
    );
};

export default MessageTypeSelector;