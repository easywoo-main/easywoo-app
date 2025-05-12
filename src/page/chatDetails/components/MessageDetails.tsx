import React, { useState, useEffect } from 'react';
import { Button, TextField, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        setTimeout(() => {
            const fetchedUsers = [
                { id: 1, name: 'User 1', dateCompleted: '2025-05-12' },
                { id: 2, name: 'User 2', dateCompleted: '2025-05-11' },
                { id: 3, name: 'User 3', dateCompleted: '2025-05-10' },
            ];
            setUsers(fetchedUsers);
            setLoading(false);
        }, 2000);
    }, [messageId]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleExport = () => {
        // Data export logic can be implemented here
        console.log('Exporting data', users);
    };

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

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
                        <Button variant="contained" color="primary" onClick={handleExport}>Export</Button>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <div>{filteredUsers.length} users completed the step</div>
                    </div>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>User Name</TableCell>
                                    <TableCell>Completion Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUsers.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.dateCompleted}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}

            <div style={{ position: 'absolute', top: 8, right: 8 }}>
                <IconButton onClick={onClose} color="secondary">
                    <CloseIcon />
                </IconButton>
            </div>
        </Paper>
    );
};

export default MessageDetails;