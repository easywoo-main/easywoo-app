import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    DialogActions, List, ListItem, Avatar, ListItemText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {getPaginationStepChatMessage} from "../../../api/stepChatMessage.service";
import {StepChatMessage} from "../../../type/stepChatMessage.type";
import RemoveIcon from "@mui/icons-material/Remove";
import {Add} from "@mui/icons-material";

interface User {
    id: number;
    name: string;
    dateCompleted: string;
}

interface MessageDetailsProps {
    messageId: string;
    onClose: () => void;
}

const MessageDetails: React.FC<MessageDetailsProps> = ({ messageId, onClose }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [stepChatMessages, setStepChatMessages] = useState<StepChatMessage[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        getStepChatMessage();
    }, [messageId]);

    const getStepChatMessage = async () => {
        setLoading(true)
        try{
            const stepChatMessage = await getPaginationStepChatMessage(messageId, {search: searchTerm});
            setStepChatMessages(stepChatMessage.content);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        getStepChatMessage();
    }, [searchTerm]);

    return (
        <Paper sx={{ p: 2 }}>
            {loading ? (
                <div style={{ textAlign: 'center' }}>
                    <CircularProgress />
                    <div>Loading...</div>
                </div>
            ) : (
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <TextField
                            label="Search user"
                            variant="outlined"
                            fullWidth
                            value={searchTerm}
                            onChange={handleSearchChange}
                            size="small"
                        />
                    </div>

                    <List dense sx={{ overflow: 'auto', mb: 2 }}>
                        {stepChatMessages.map((stepChatMessage) => {
                            return (
                                <ListItem
                                    key={stepChatMessage.id}
                                    sx={{
                                        backgroundColor: 'inherit',
                                    }}
                                >
                                    <Avatar alt={stepChatMessage.user.name} src={stepChatMessage.user.photo} sx={{ m: 1 }} />
                                    <ListItemText
                                        primary={stepChatMessage.user.name}
                                        secondary={
                                            <>
                                                {stepChatMessage.user.email}
                                            </>
                                        }
                                    />
                                    {new Date(stepChatMessage.createdAt).toLocaleString()}
                                </ListItem>
                            );
                        })}
                    </List>

                    {/*<TableContainer component={Paper}>*/}
                    {/*    <Table>*/}
                    {/*        <TableHead>*/}
                    {/*            <TableRow>*/}
                    {/*                <TableCell>User Name</TableCell>*/}
                    {/*                <TableCell>Completion Date</TableCell>*/}
                    {/*            </TableRow>*/}
                    {/*        </TableHead>*/}
                    {/*        <TableBody>*/}
                    {/*            {stepChatMessages?.map((stepChatMessage) => (*/}
                    {/*                <TableRow key={stepChatMessage.id}>*/}
                    {/*                    <TableCell>{stepChatMessage.user?.name}</TableCell>*/}
                    {/*                    <TableCell>{stepChatMessage.createdAt.toString()}</TableCell>*/}
                    {/*                </TableRow>*/}
                    {/*            ))}*/}
                    {/*        </TableBody>*/}
                    {/*    </Table>*/}
                    {/*</TableContainer>*/}
                </>
            )}
            <DialogActions>
                <Button onClick={onClose} variant="contained">Close</Button>
            </DialogActions>
        </Paper>
    );
};

export default MessageDetails;