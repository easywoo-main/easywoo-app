import React from 'react';
import { Box, Button } from '@mui/material';

interface Props {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

const PaginationControls: React.FC<Props> = ({ page, totalPages, onPageChange }) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
            <Button
                variant="outlined"
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
                sx={{ mr: 2 }}
            >
                Previous
            </Button>
            <Box mx={2}>
                Page {page} of {totalPages}
            </Box>
            <Button
                variant="outlined"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
            >
                Next
            </Button>
        </Box>
    );
};

export default PaginationControls;
