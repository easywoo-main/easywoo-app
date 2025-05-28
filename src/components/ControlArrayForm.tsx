import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import {
    Controller,
    Control,
    FieldErrors,
    useFieldArray,
    Path,
    FieldValues,
    ArrayPath,
} from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import { ControllerRenderProps } from "react-hook-form/dist/types/controller";

interface ControlArrayFormProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    errors: FieldErrors<TFieldValues>;
    name: Path<TFieldValues>;
    label: string;
    render: (field: ControllerRenderProps<TFieldValues>, label: string, index: number) => React.ReactElement;
    defaultValue?: any;
    emptyItem?: any;
}

function ControlArrayForm<TFieldValues extends FieldValues>({
                                                                control,
                                                                errors,
                                                                name,
                                                                label,
                                                                render,
                                                                emptyItem,
                                                            }: ControlArrayFormProps<TFieldValues>) {
    const { fields, append, remove } = useFieldArray<TFieldValues>({
        control,
        name: name as ArrayPath<TFieldValues>,
    });

    return (
        <Box>
            <Typography variant="h6" mb={2}>
                {label}
            </Typography>

            {fields.map((field, index) => (
                <Box key={field.id} display="flex" alignItems="center" mb={2}>
                    <Controller
                        name={`${name}.${index}` as Path<TFieldValues>}
                        control={control}
                        defaultValue={field as any}
                        render={({ field }) => render(field, `${label} #${index + 1}`, index)}
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

            <Button variant="contained" onClick={() => append(emptyItem)}>
                Add {label}
            </Button>
        </Box>
    );
}

export default ControlArrayForm;
