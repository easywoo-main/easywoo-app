import React from "react";
import { Box, Button, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { Controller } from "react-hook-form";

const NewSliderForm: React.FC<any> = ({ message, setMessage, control, errors }) => {
    return (
        <Box>
            {message.sliderProps.map((slider: any, index: number) => (
                <Box key={index}>
                    <Controller
                        name={`sliderProps[${index}].name`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Slider Name"
                                error={!!errors?.sliderProps?.[index]?.name}
                                helperText={errors?.sliderProps?.[index]?.name?.message}
                            />
                        )}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={slider.type === "POSITIVE"}
                                onChange={() => {
                                    const updatedSliders = [...message.sliderProps];
                                    updatedSliders[index].type = slider.type === "POSITIVE" ? "NEGATIVE" : "POSITIVE";
                                    setMessage({ ...message, sliderProps: updatedSliders });
                                }}
                            />
                        }
                        label="Is Positive"
                    />
                    <Button onClick={() => {}}>Delete Slider</Button>
                </Box>
            ))}
            <Button onClick={() => {}}>Add New Slider</Button>
        </Box>
    );
};

export default NewSliderForm;
