import React, { useCallback, useEffect } from "react";
import { Box, CircularProgress, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { Control, Controller, useWatch } from "react-hook-form";
import { getAllSliderPropsByChatId } from "../../../api/sliderProp.service";
import { SliderProp } from "../../../type/messageSlider.type";
import { getChatById } from "../../../api/chat.service";
import { AxiosError } from "axios";
import { Chat } from "../../../type/chat.type";

interface CustomFormProps {
    control: Control<any>;
    chatId: string;
    setValue: any;
}

const VariableForm: React.FC<CustomFormProps> = ({ control, chatId, setValue }) => {
    const [loading, setLoading] = React.useState(true);
    const [chat, setChat] = React.useState<Chat>();
    const [sliderProps, setSliderProps] = React.useState<SliderProp[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    const isBarometer = useWatch({ control, name: "isBarometer" });
    const sliderPropId = useWatch({ control, name: "sliderPropId" });

    const getAllSliderProps = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [data, chat] = await Promise.all([getAllSliderPropsByChatId(chatId), getChatById(chatId)]);
            setSliderProps(data);
            setChat(chat);
        } catch (err: AxiosError | any) {
            console.log(err?.response?.data?.message);
            setError(err?.response?.data?.message || "An error occurred while loading data.");
        } finally {
            setLoading(false);
        }
    }, [chatId]);

    useEffect(() => {
        if (chatId) getAllSliderProps();
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
            <Typography>Variable:</Typography>
            <Controller
                name="sliderPropId"
                control={control}
                render={({ field }) => {


                    const radioValue = (isBarometer ? "isBarometer" : (field.value || ""));
                    console.log("radioValue", radioValue)
                    console.log(" (field.value || \"\")",  (field.value || ""));
                    console.log("value",  field.value )
                    return (
                        <RadioGroup
                            value={radioValue}
                            onChange={(e) => {
                                const val = e.target.value;

                                if (val === "isBarometer") {
                                    setValue("isBarometer", true);
                                    setValue("sliderPropId", null);
                                    field.onChange(null);
                                } else if (val === "") {
                                    setValue("isBarometer", false);
                                    setValue("sliderPropId", null);
                                    field.onChange(null);
                                } else {
                                    setValue("isBarometer", false);
                                    setValue("sliderPropId", val);
                                    field.onChange(val);
                                }
                            }}
                        >
                            <FormControlLabel value="" control={<Radio />} label="None" />
                            <FormControlLabel value="isBarometer" control={<Radio />} label={chat.masterGraph || "Master Graph"} />
                            {sliderProps.map((sliderProp) => (
                                <FormControlLabel
                                    key={sliderProp.id}
                                    value={sliderProp.id}
                                    control={<Radio />}
                                    label={sliderProp.name}
                                />
                            ))}
                        </RadioGroup>
                    );
                }}
            />
        </Box>
    );
};

export default VariableForm;
