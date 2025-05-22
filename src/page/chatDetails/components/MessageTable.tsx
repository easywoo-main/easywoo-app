import React, { useState } from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import EditMessageModal from "./EditMessageModal"; // імпорт модального вікна
import { ChatMessageWithRelations } from "../../../type/chatMessage";

interface MessageTableProps {
    data: ChatMessageWithRelations[];
    messageId: string;
    handleUpdate: (messageId: string, isSelected: boolean) => void;
}

const MessageTable: React.FC<MessageTableProps> = ({ data, messageId, handleUpdate }) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [messageToEdit, setMessageToEdit] = useState<ChatMessageWithRelations | null>(null);

    const isNextStep = data.some(item => item.prevMessages?.some(prev => prev.id === messageId));
    const sortedData = [...data].sort((a, b) => {
        const aIsNextStep = a.prevMessages?.some(prev => prev.id === messageId) ? 1 : 0;
        const bIsNextStep = b.prevMessages?.some(prev => prev.id === messageId) ? 1 : 0;
        return bIsNextStep - aIsNextStep;
    });

    const openEditModal = (message: ChatMessageWithRelations) => {
        setMessageToEdit(message);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setMessageToEdit(null);
    };

    const handleSubmitEdit = async (newMessage: ChatMessageWithRelations) => {
        // Тут можна викликати API або оновити стан
        console.log("Edited message submitted:", newMessage);
        // Закриваємо модалку після сабміту
        closeEditModal();
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ m: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Step Name</TableCell>
                            <TableCell>Actions</TableCell>
                            <TableCell>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.length > 0 ? (
                            sortedData.map((item) => {
                                const isSelected = item.prevMessages?.some(prev => prev.id === messageId);
                                return (
                                    <TableRow
                                        key={item.id}
                                        sx={{
                                            backgroundColor: isSelected ? "#ededed" : "inherit",
                                        }}
                                    >
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>
                                            {(!isNextStep) && (
                                                <Button onClick={() => handleUpdate(item.id, !isSelected)}>
                                                    {isSelected ? "Delete Relation" : "Add Relation"}
                                                </Button>
                                            )}
                                            {isNextStep && isSelected && (
                                                <Button onClick={() => handleUpdate(item.id, !isSelected)}>
                                                    Delete Relation
                                                </Button>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                onClick={() => openEditModal(item)}
                                            >
                                                Edit Message
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <Typography variant="body2" color="textSecondary">
                                        No messages found.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {editModalOpen && messageToEdit && (
                <EditMessageModal
                    message={messageToEdit}
                    onClose={closeEditModal}
                    onSubmit={handleSubmitEdit}
                />
            )}
        </>
    );
};

export default MessageTable;
