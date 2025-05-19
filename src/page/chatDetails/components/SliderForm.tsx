import React from "react";
import {Box, Button, TextField, FormControlLabel, Checkbox, Divider, Typography} from "@mui/material";
import {Control, Controller, useFieldArray} from "react-hook-form";
import { SliderPropType } from "../../../type/messageSlider.type";
import ControlTextField from "../../../components/ControlTextField";

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
            <Typography variant="h5" sx={{mt:3}}>Measurable Variables</Typography>
            {fields.map((field, index) => (
                <Box key={field.id} sx={{ borderRadius: 1 }}>
                    <Typography variant="h6">Slider {index+1}</Typography>
                    <ControlTextField control={control} errors={errors} name={`sliderProps[${index}].name`} label="Slider variable name"/>
                    <ControlTextField control={control} errors={errors} name={`sliderProps[${index}].text`} label="Slider Text"/>

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

                    <ControlTextField control={control} errors={errors} name={`sliderProps[${index}].positiveMessage`} label="Positive Message"/>
                    <ControlTextField control={control} errors={errors} name={`sliderProps[${index}].negativeMessage`} label="Negative Message"/>

                    <Button variant="outlined" color="error" onClick={() => handleDeleteSlider(index)}>
                        Delete Slider
                    </Button>
                    <Divider orientation="horizontal" flexItem sx={{mt: 2, mb: 3, borderWidth: 1}} />
                </Box>
            ))}

            <Button variant="contained" onClick={handleAddSlider}>
                Add New Slider
            </Button>

            <ControlTextField control={control}
                              errors={errors}
                              name="formula"
                              label="Formula Input"
                              placeholder="e.g., sliderName^2 + 3 * 5"/>
        </Box>
    );
};

export default SliderForm;
