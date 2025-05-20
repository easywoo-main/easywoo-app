import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
} from "@mui/material";

interface MessageTableProps {
    data: { id: string; name: string; nextMessageId?: string }[];
    messageId: string;
    handleUpdate: (id: string, isSelected: boolean) => void;
}

const MessageTable: React.FC<MessageTableProps> = ({ data, messageId, handleUpdate }) => {
    return (
        <TableContainer component={Paper} sx={{ m: 1 }}>
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
                            const isSelected = item.nextMessageId === messageId;
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
                                        <Button
                                            onClick={() => handleUpdate(item.id, !isSelected)}
                                            variant="contained"
                                        >
                                            {isSelected ? "Delete Relation" : "Add Relation"}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Typography variant="body2" color="textSecondary">
                                    No messages found.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MessageTable;