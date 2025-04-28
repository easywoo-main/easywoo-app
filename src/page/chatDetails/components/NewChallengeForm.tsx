import React from "react";
import { Box, TextField } from "@mui/material";
import { CreateUpdateChatMessageDto } from "../type";
import NewFileForm from "./NewFileForm";

interface Props {
    message: CreateUpdateChatMessageDto;
    setMessage: (message: CreateUpdateChatMessageDto) => void;
}

const NewChallengeForm: React.FC<Props> = ({ message, setMessage }) => {
    return (
        <Box>
            <NewFileForm message={message} setMessage={setMessage} />
            <TextField
                label="Timeout (seconds)"
                type="number"
                fullWidth
                margin="normal"
                value={message.timeout}
                onChange={(e) => setMessage({ ...message, timeout: Number(e.target.value) })}
            />
        </Box>
    );
};

export default NewChallengeForm;
