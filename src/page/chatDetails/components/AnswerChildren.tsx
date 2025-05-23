import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    DialogActions,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Paper,
} from "@mui/material";
import { getAllMessageChoiceByChatMessageId, updateMessageChoice } from "../../../api/messageChoice.service";
import { MessageChoice } from "../../../type/messageChoice.type";
import EditAnswerModal from "./EditAnswerModal";
import CreateAnswerModal from "./CreateAnswerModal";

interface MessageChildrenProps {
    message: { id: string; chatId: string };
    onClose: () => void;
}

export const AnswerChildren: React.FC<MessageChildrenProps> = ({ message, onClose }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState<MessageChoice[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingAnswer, setEditingAnswer] = useState<MessageChoice | null>(null);
    const [creatingNew, setCreatingNew] = useState(false);

    const handleGetData = async () => {
        setLoading(true);
        try {
            const response = await getAllMessageChoiceByChatMessageId(message.id, message.chatId, { search: searchTerm });
            setData(response.content);
        } catch (e) {
            console.error("Error fetching data", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetData();
    }, [message, searchTerm]);

    const handleEditClick = (answer: MessageChoice) => {
        setEditingAnswer(answer);
    };

    const handleModalClose = () => {
        setEditingAnswer(null);
        setCreatingNew(false);
    };

    const handleModalSubmit = (updatedAnswer: MessageChoice) => {
        setEditingAnswer(null);
        setCreatingNew(false);
        handleGetData();
    };

    const handleCreateClick = () => {
        setCreatingNew(true);
    };

    return (
        <Box sx={{ m: 5 }}>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
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
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((answer) => (
                                <TableRow key={answer.id}>
                                    <TableCell>{answer.id}</TableCell>
                                    <TableCell>{answer.name}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="outlined" onClick={() => handleEditClick(answer)}>
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        No data found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <DialogActions sx={{ mt: 2 }}>
                <Button onClick={onClose} variant="contained">
                    Close
                </Button>
            </DialogActions>

            {editingAnswer && (
                <EditAnswerModal
                    answer={editingAnswer}
                    onClose={handleModalClose}
                    onSubmit={handleModalSubmit}
                    chatId={message.chatId}
                />
            )}

            {creatingNew && (
                <CreateAnswerModal
                    prevMessageId={message.id}
                    onClose={handleModalClose}
                    onSubmit={handleModalSubmit}
                />
            )}
        </Box>
    );
};

export default AnswerChildren;
