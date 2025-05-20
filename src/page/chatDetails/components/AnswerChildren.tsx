import React, {useEffect, useState} from "react";
import {Box, Button, CircularProgress, DialogActions, Stack, TextField} from "@mui/material";
import {getAllByChatMessageId} from "../../../api/chatMessage.service";
import {ChatMessage, ChatMessageWithRelations} from "../../../type/chatMessage";
import MessageTable from "./MessageTable";
import {getAllMessageChoiceByChatMessageId, updateMessageChoice} from "../../../api/messageChoice.service";
import { MessageChoice } from "../../../type/messageChoice.type";

interface MessageChildrenProps {
    message: ChatMessageWithRelations;
    onClose: () => void;
}

export const AnswerChildren: React.FC<MessageChildrenProps> = ({message, onClose}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState<MessageChoice[]>([]);
    const [loading, setLoading] = useState(false);

    const handleGetData = async () => {
        setLoading(true);
        try {
            const data = await getAllMessageChoiceByChatMessageId(message.id, message.chatId, {search: searchTerm});
            setData(data.content);
        } catch (e) {
            console.error("Error fetching data", e);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (chatMessageId: string, isSelected: boolean) => {
        setLoading(true);
        try {
            await updateMessageChoice(chatMessageId, {nextMessageId: isSelected ? message.id : null});
            await handleGetData();
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetData();
    }, [message]);

    return (
        <Box sx={{m: 5}}>
            <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                    label="Search Messages"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth
                />
            </Stack>

            {loading ? (
                <CircularProgress/>
            ) : (
                <MessageTable data={data} messageId={message.id} handleUpdate={handleUpdate}/>
            )}

            <DialogActions>
                <Button onClick={onClose} variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Box>
    );
};

export default AnswerChildren;