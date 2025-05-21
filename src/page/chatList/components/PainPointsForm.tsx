import React from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import {Controller, Control, FieldErrors, useFieldArray, Path, FieldValues, ArrayPath} from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";

interface PainPointsFormProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    errors: FieldErrors<TFieldValues>;
    name: Path<TFieldValues>;
    label?: string;
}

function PainPointsForm<TFieldValues extends FieldValues>({
                                          control,
                                          errors,
                                          name,
                                          label = "Pain Points",
                                      }: PainPointsFormProps<TFieldValues>) {
    const { fields, append, remove } = useFieldArray<TFieldValues>({
        control,
        name: name as ArrayPath<TFieldValues>,
    });

    return (
        <Box>
            <Typography variant="h6" mb={2}>{label}</Typography>

            {fields.map((field, index) => (
                <Box key={field.id} display="flex" alignItems="center" mb={2}>
                    <Controller
                        name={`${name}.${index}` as Path<TFieldValues>}
                        control={control}
                        defaultValue={field as any}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label={`Pain Point #${index + 1}`}
                                variant="outlined"
                                fullWidth
                                // error={!!errors?.[name]?.[index]}
                                // helperText={errors?.[name]?.[index] ? (errors[name][index] as any)?.message : ""}
                            />
                        )}
                    />
                    <IconButton
                        color="error"
                        aria-label="delete"
                        onClick={() => remove(index)}
                        sx={{ ml: 1 }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}

            <Button variant="contained" onClick={() => append("" as any)}>
                Add Pain Point
            </Button>
        </Box>
    );
}

export default PainPointsForm;
