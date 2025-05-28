import React, { useState } from 'react';
import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
    const [input, setInput] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        const newValue = e.target.value;
        onChange(newValue);
    };

    return (
        <Box mb={2}>
            <TextField
                fullWidth
                placeholder="Search"
                value={input}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

export default SearchBar;
