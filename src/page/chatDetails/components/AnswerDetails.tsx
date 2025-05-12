import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Button,
    CircularProgress,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
} from '@mui/material';
import {getPaginationStepChatMessage} from "../../../api/stepChatMessage.service";
import {StepChatMessage} from "../../../type/stepChatMessage.type";

interface AnswerDetailsProps {
    answerId: string;
    onClose: () => void;
}

const AnswerDetails: React.FC<AnswerDetailsProps> = ({ answerId, onClose }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [stepChatMessages, setStepChatMessages] = useState<StepChatMessage[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        getStepChatMessage();
    }, [answerId]);

    const getStepChatMessage = async () => {
        setLoading(true)
        try{
            const stepChatMessage = await getPaginationStepChatMessage(answerId, {search: searchTerm});
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
                                    {/*<ListItemText*/}
                                    {/*    primary={*/}
                                    {/*        <Typography sx={{ fontWeight: 'bold' }}>*/}
                                    {/*            test*/}
                                    {/*        </Typography>*/}
                                    {/*    }*/}
                                    {/*/>*/}
                                    {new Date(stepChatMessage.createdAt).toLocaleString()}
                                </ListItem>
                            );
                        })}
                    </List>
                </>
            )}
            <DialogActions>
                <Button onClick={onClose} variant="contained">Close</Button>
            </DialogActions>
        </Paper>
    );
};

export default AnswerDetails;