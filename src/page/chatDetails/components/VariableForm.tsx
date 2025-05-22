import React, { useEffect, useCallback } from "react";
import { Box, Checkbox, CircularProgress, Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import ControlCheckbox from "../../../components/ControlCheckbox";
import { getAllSliderPropsByChatId } from "../../../api/sliderProp.service";
import { SliderProp } from "../../../type/messageSlider.type";

interface CustomFormProps {
    control: Control<any>;
    chatId: string;
}

const VariableForm: React.FC<CustomFormProps> = ({ control, chatId }) => {
    const [loading, setLoading] = React.useState(true);
    const [sliderProps, setSliderProps] = React.useState<SliderProp[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    const getAllSliderProps = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllSliderPropsByChatId(chatId);
            setSliderProps(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load slider props");
        } finally {
            setLoading(false);
        }
    }, [chatId]);

    useEffect(() => {
        if (chatId) {
            getAllSliderProps();
        }
    }, [chatId, getAllSliderProps]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={100}>
                <CircularProgress size={24} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Controller
                name="variableIds"
                control={control}
                render={({ field }) => (
                    <>
                        {sliderProps.map((sliderProp) => (
                            <Box key={sliderProp.id} display="flex" alignItems="center" mb={1}>
                                <Checkbox
                                    checked={field.value?.includes(sliderProp.id) || false}
                                    onChange={(e) => {
                                        let newValue: string[] = Array.isArray(field.value) ? [...field.value] : [];
                                        if (e.target.checked) {
                                            newValue.push(sliderProp.id);
                                        } else {
                                            newValue = newValue.filter((id) => id !== sliderProp.id);
                                        }
                                        field.onChange(newValue);
                                    }}
                                />
                                <Typography>{sliderProp.name}</Typography>
                            </Box>
                        ))}
                    </>
                )}
            />
            <ControlCheckbox control={control} name="isBarometer" label="Barometer" />
        </Box>
    );
};

export default VariableForm;
