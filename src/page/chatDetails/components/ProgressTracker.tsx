import React, {JSX, useEffect, useState } from 'react';
import {
    Button,
    CircularProgress,
    DialogActions,
    List,
    ListItem,
    Paper,
    TextField,
} from '@mui/material';
import { PageRequestArgs, PageResponse } from '../../../utils/pageable.utils';

interface MessageDetailsProps<T> {
    getPaginationData: (option: PageRequestArgs) => Promise<PageResponse<T>>;
    onClose: () => void;
    children: (item: T) => JSX.Element;
}

const ProgressTracker = <T,>({
                                onClose,
                                getPaginationData,
                                children,
                            }: MessageDetailsProps<T>) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<T[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        getData();
    }, [searchTerm]);

    const getData = async () => {
        setLoading(true);
        try {
            const response = await getPaginationData({ search: searchTerm });
            setData(response.content);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

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
                        {data.map((item, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    backgroundColor: 'inherit',
                                }}
                            >
                                {children(item)}
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
            <DialogActions>
                <Button onClick={onClose} variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Paper>
    );
};

export default ProgressTracker;
