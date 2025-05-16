import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

interface FormulaTextFieldProps {
    control: any;
    errors: any;
}

const FormulaTextField: React.FC<FormulaTextFieldProps> = ({ control, errors }) => {
    return (
        <Controller
            name="formula"
            control={control}
            render={({ field }) => (
                <TextField
                    fullWidth
                    label="Formula Input"
                    {...field}
                    error={!!errors?.formula}
                    helperText={errors?.formula?.message}
                    sx={{ marginBottom: 2, marginTop: 2 }}
                    placeholder="e.g., sliderName^2 + 3 * 5"
                />
            )}
        />
    );
};

export default FormulaTextField;
