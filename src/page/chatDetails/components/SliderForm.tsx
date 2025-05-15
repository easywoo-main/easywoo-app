import React from "react";
import { Box, Button, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { Controller, useFieldArray } from "react-hook-form";
import { SliderPropType } from "../../../type/messageSlider.type";

interface SliderFormProps {
    control: any;
    errors: any;
}

const SliderForm: React.FC<SliderFormProps> = ({ control, errors }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "sliderProps",
    });

    const handleDeleteSlider = (index: number) => {
        remove(index);
    };

    const handleAddSlider = () => {
        append({ name: "", type: SliderPropType.NEGATIVE });
    };

    return (
        <Box>
            {fields.map((field, index) => (
                <Box key={field.id} sx={{ borderRadius: 1 }}>
                    <Controller
                        name={`sliderProps[${index}].name`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Slider Name"
                                fullWidth
                                margin="normal"
                                error={!!errors?.sliderProps?.[index]?.name}
                                helperText={errors?.sliderProps?.[index]?.name?.message}
                            />
                        )}
                    />
                    <Controller
                        name={`sliderProps[${index}].text`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Slider Text"
                                fullWidth
                                margin="normal"
                                error={!!errors?.sliderProps?.[index]?.text}
                                helperText={errors?.sliderProps?.[index]?.text?.message}
                            />
                        )}
                    />
                    <Controller
                        name={`sliderProps[${index}].type`}
                        control={control}
                        defaultValue={SliderPropType.NEGATIVE}
                        render={({ field: checkboxField }) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkboxField.value === SliderPropType.POSITIVE}
                                        onChange={(e) =>
                                            checkboxField.onChange(
                                                e.target.checked ? SliderPropType.POSITIVE : SliderPropType.NEGATIVE
                                            )
                                        }
                                    />
                                }
                                label="Is Positive"
                            />
                        )}
                    />
                    <Button variant="outlined" color="error" onClick={() => handleDeleteSlider(index)}>
                        Delete Slider
                    </Button>
                </Box>
            ))}

            <Button variant="contained" onClick={handleAddSlider}>
                Add New Slider
            </Button>
        </Box>
    );
};

export default SliderForm;
