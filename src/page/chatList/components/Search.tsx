import React from 'react';
import { TextField } from '@mui/material';

type SearchProps = {
    query: string;
    onSearch: (query: string) => void;
};

const Search: React.FC<SearchProps> = ({ query, onSearch }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <TextField
            value={query}
            onChange={handleInputChange}
            placeholder="Search chats..."
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
        />
    );
};

export default Search;
