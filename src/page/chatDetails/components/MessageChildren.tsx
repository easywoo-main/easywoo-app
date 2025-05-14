import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    CircularProgress,
    DialogActions,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {getAllByChatMessageId, updateChatMessage} from "../../../api/chatMessage.service";
import {ChatMessage, ChatMessageWithRelations} from "../../../type/chatMessage";

interface MessageChildrenProps {
    message: ChatMessageWithRelations;
    onClose: () => void;
}

export const MessageChildren: React.FC<MessageChildrenProps> = ({message, onClose}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);

    const handleGetData = async () => {
        setLoading(true);
        try {
            const data = await getAllByChatMessageId(message.id, message.chatId, {search: searchTerm});
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
            await updateChatMessage(chatMessageId, {nextMessageId: isSelected ? message.id: null})
            await  handleGetData()
        } catch (e){
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

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
                {/*<IconButton onClick={() => onToggleVisibility(false)} color="primary">*/}
                {/*    <RemoveIcon />*/}
                {/*</IconButton>*/}
            </Stack>

            {loading ? (
                <CircularProgress/>
            ) : (
                <TableContainer component={Paper} sx={{m: 1}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length > 0 ? (
                                data.map((item) => {
                                    const isSelected = item.nextMessageId === message.id;
                                    return (
                                        <TableRow key={item.id} sx={{
                                            backgroundColor: isSelected ? '#ededed' : 'inherit',
                                        }}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                                <Button onClick={()=>handleUpdate(item.id, !isSelected)} variant="contained">
                                                    {isSelected ? "Delete Relation" : "Add Relation" }
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <Typography variant="body2" color="textSecondary">
                                            No messages found.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <DialogActions>
                <Button onClick={onClose} variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Box>
    );
};


export default MessageChildren
