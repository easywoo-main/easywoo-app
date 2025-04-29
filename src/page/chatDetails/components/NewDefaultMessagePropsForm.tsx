import React from "react";
import {TextField, Box, FormControlLabel, Checkbox} from "@mui/material";
import {CreateUpdateChatMessageDto, SliderPropType} from "../type";

interface Props {
    message: CreateUpdateChatMessageDto;
    setMessage: (message: CreateUpdateChatMessageDto) => void;
}

const NewDefaultMessagePropsForm: React.FC<Props> = ({ message, setMessage }) => {
    return (
        <Box my={2}>
            <TextField
                fullWidth
                multiline
                minRows={3}
                label="Message Text"
                value={message.name}
                onChange={(e) => setMessage({ ...message, name: e.target.value })}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={message.isCheckpoint}
                        onChange={(e) => setMessage({ ...message, isCheckpoint: e.target.checked })}
                    />
                }
                label="Is Checkpoint"
            />
        </Box>
    );
};

export default NewDefaultMessagePropsForm;