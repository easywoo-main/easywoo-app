import React, { useEffect, useState } from "react";
import { Box, Stack, TextField, CircularProgress, DialogActions, Button } from "@mui/material";
import {ChatMessageWithPrevMessage} from "../../../type/chatMessage";
import MessageTable from "./MessageTable";
import {PageResponse} from "../../../utils/pageable.utils";
import CreateMessageModal from "./CreateMessageModal";

interface MessageChildrenProps {
    messageId: string;
    onClose: () => void;
    chatId: string;
    getData: (searchTerm: string) => Promise<PageResponse<ChatMessageWithPrevMessage>>;
    updateData: ( nextMessageId:  string | null) => Promise<void>;
    selectionCondition: (chatMessage: ChatMessageWithPrevMessage) => boolean;
}
export const MessageChildren: React.FC<MessageChildrenProps> = ({ messageId, onClose,getData, updateData, selectionCondition, chatId }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState<ChatMessageWithPrevMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [creatingNew, setCreatingNew] = useState(false);

    const handleGetData = async () => {
        setLoading(true);
        try {
            const data = await getData(searchTerm)
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
            await updateData(isSelected ? chatMessageId : null);
            await handleGetData();
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateClick = () => {
        setCreatingNew(true);
    };
    const handleModalClose = () => {
        handleGetData()
        setCreatingNew(false);
    };


    useEffect(() => {
        handleGetData();
    }, [messageId]);

    return (
        <Box sx={{ m: 5 }}>
            <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                    label="Search Messages"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth
                />
                <Button variant="contained" onClick={handleCreateClick}>
                    Create New
                </Button>
            </Stack>

            {loading ? (
                <CircularProgress />
            ) : (
                <MessageTable data={data} messageId={messageId} handleUpdate={handleUpdate} selectionCondition={selectionCondition}/>
            )}

            <DialogActions>
                <Button onClick={onClose} variant="contained">
                    Close
                </Button>
            </DialogActions>

            {creatingNew && (
                <CreateMessageModal
                    onClose={handleModalClose}
                    chatId={chatId}
                    prevMessageId={messageId}
                />
            )}
        </Box>
    );
};

export default MessageChildren;
