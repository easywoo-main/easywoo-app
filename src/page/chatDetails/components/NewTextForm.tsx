import React from "react";
import { TextField, Box } from "@mui/material";
import { CreateUpdateChatMessageDto } from "../type/createUpdateChatMessage.dto";

interface Props {
    message: CreateUpdateChatMessageDto;
    setMessage: (message: CreateUpdateChatMessageDto) => void;
}

const NewTextForm: React.FC<Props> = ({ message, setMessage }) => {
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
        </Box>
    );
};

export default NewTextForm;