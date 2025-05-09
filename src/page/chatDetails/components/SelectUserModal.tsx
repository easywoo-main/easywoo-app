import React, {useEffect, useState} from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, List, ListItem, ListItemText, IconButton,
    Button, Chip, Stack, Typography, Avatar
} from '@mui/material';
import {Add} from '@mui/icons-material';
import RemoveIcon from '@mui/icons-material/Remove';
import {getPaginationUser} from "../../../api/user.service";
import {User} from '../../../type/user.type';
import {Chat} from "../../../type/chat.type";

interface Props {
    onClose: () => void;
    selectedUsers: User[];
    setSelectedUsers: (users: User[]) => void;
    chat: Chat
}

const SelectUserModal: React.FC<Props> = ({onClose, selectedUsers, setSelectedUsers, chat}) => {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        getPaginationUser(chat.id, {search: searchTerm}).then((data) => {
            setAllUsers(data.content)
        }).catch(console.error);
    }, []);

    const filteredUsers = allUsers.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addUser = (user: User) => {
        if (!selectedUsers.some((u) => u.id === user.id)) {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const removeUser = (id: string) => {
        setSelectedUsers(selectedUsers.filter((u) => u.id !== id));
    };

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add user</DialogTitle>

            <DialogContent dividers>
                <TextField
                    fullWidth
                    label="User search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    margin="normal"
                />

                <List dense sx={{maxHeight: 200, overflow: 'auto', mb: 2}}>
                    {filteredUsers.map((user) => {
                        const isSelected = selectedUsers.some((u) => u.id === user.id);
                        return (
                            <ListItem
                                key={user.id}
                                sx={{
                                    backgroundColor: isSelected ? '#ededed' : 'inherit',
                                }}
                                secondaryAction={
                                    <IconButton edge="end"
                                                onClick={() => isSelected ? removeUser(user.id) : addUser(user)}>
                                        {isSelected ? <RemoveIcon/> : <Add/>}
                                    </IconButton>
                                }
                            >
                                <Avatar alt={user.name} src={user.photo} sx={{m: 1}}/>
                                <ListItemText primary={user.name} secondary={user.email}/>
                            </ListItem>
                        )
                    })}
                </List>

                <Typography variant="subtitle1" gutterBottom>
                    Selected user:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {selectedUsers.map((user) => (
                        <Chip
                            key={user.id}
                            label={user.name}
                            onDelete={() => removeUser(user.id)}
                            sx={{mb: 1}}
                        />
                    ))}
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} variant="contained">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SelectUserModal;
