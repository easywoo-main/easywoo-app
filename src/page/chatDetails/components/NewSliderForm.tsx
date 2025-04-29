import {Box, Checkbox, FormControlLabel, TextField, Button} from "@mui/material";
import React from "react";
import {CreateUpdateChatMessageDto, SliderPropType} from "../type";
import NewTextForm from "./NewTextForm";
import {deleteMessageSlider} from "../../../api/messageSliderProps";

interface NewSliderFormProps {
    message: CreateUpdateChatMessageDto;
    setMessage: (message: CreateUpdateChatMessageDto) => void;
}

const NewSliderForm: React.FC<NewSliderFormProps> = ({message, setMessage}) => {

    const handleSliderNameChange = (index: number, newName: string) => {
        const updatedSliderProps = [...message.sliderProps!];
        updatedSliderProps[index].name = newName;
        setMessage({...message, sliderProps: updatedSliderProps});
    };

    const handleCheckboxChange = (index: number, checked: boolean) => {
        const updatedSliderProps = [...message.sliderProps!];
        updatedSliderProps[index].type = checked ? SliderPropType.POSITIVE : SliderPropType.NEGATIVE;
        setMessage({...message, sliderProps: updatedSliderProps});
    };

    const handleAddNewSlider = () => {
        const newSlider = {
            id: undefined,
            name: "",
            type: SliderPropType.NEGATIVE,
        };
        const updatedSliderProps = [...(message.sliderProps ? message.sliderProps : []), newSlider];
        setMessage({...message, sliderProps: updatedSliderProps});
    };

    const handleDeleteSlider = (index: number) => {
        const updatedSliderProps = message.sliderProps!.filter((_, i) => i !== index);
        const deletedSliderProps = message.sliderProps!.filter((_, i) => i === index);
        deletedSliderProps.filter(item => item.id).forEach(async item => await deleteMessageSlider(item.id!));
        setMessage({...message, sliderProps: updatedSliderProps});
    };

    return (
        <Box>
            <NewTextForm message={message} setMessage={setMessage}/>

            {message.sliderProps && message.sliderProps.map((slider, index) => (
                <Box my={2} key={index}>
                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        label="Slider Text"
                        value={slider.name}
                        onChange={(e) => handleSliderNameChange(index, e.target.value)}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={slider.type === SliderPropType.POSITIVE || false}
                                onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                            />
                        }
                        label="Is Positive"
                    />
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteSlider(index)}
                        sx={{marginTop: 1}}
                    >
                        Delete Slider
                    </Button>
                </Box>
            ))}
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddNewSlider}
                sx={{marginBottom: 2}}
            >
                Add New Slider
            </Button>
        </Box>
    );
};

export default NewSliderForm;
