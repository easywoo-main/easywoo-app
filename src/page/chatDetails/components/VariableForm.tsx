import React, { useEffect, useCallback } from "react";
import { Box, Checkbox, CircularProgress, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import ControlCheckbox from "../../../components/ControlCheckbox";
import { getAllSliderPropsByChatId } from "../../../api/sliderProp.service";
import { SliderProp } from "../../../type/messageSlider.type";
import {getChatById} from "../../../api/chat.service";
import {AxiosError} from "axios";
import {Chat} from "../../../type/chat.type";

interface CustomFormProps {
    control: Control<any>;
    chatId: string;
}

const VariableForm: React.FC<CustomFormProps> = ({ control, chatId }) => {
    const [loading, setLoading] = React.useState(true);
    const [chat, setChat] = React.useState<Chat>();
    const [sliderProps, setSliderProps] = React.useState<SliderProp[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    const getAllSliderProps = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [data, chat] = await Promise.all([ getAllSliderPropsByChatId(chatId), getChatById(chatId)])
            // const data = await getAllSliderPropsByChatId(chatId);
            setSliderProps(data);
            setChat(chat)
        }  catch (err: AxiosError | any) {
            console.log(err?.response?.data?.message);
            setError(err?.response?.data?.message || 'An error occurred while saving.');
        }  finally {
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

    if (error || !chat || !sliderProps) {
        return (
            <Box>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography>Variable: </Typography>
            <ControlCheckbox control={control} name="isBarometer" label={chat.masterGraph || "Master Graph"}  />

            <Controller
                name="sliderPropIds"
                control={control}
                render={({ field }) => (
                    <FormGroup>
                        {sliderProps.map((sliderProp) => (
                            <FormControlLabel
                                key={sliderProp.id}
                                control={
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
                                }
                                label={sliderProp.name}
                            />
                        ))}
                    </FormGroup>
                )}
            />
        </Box>
    );
};

export default VariableForm;