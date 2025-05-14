import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {Controller, useFieldArray} from "react-hook-form";
import {Box, Button, TextField} from "@mui/material";


interface InfoPopUpFormProps {
    control: any;
    errors: any;
}

const InfoPopUpForm: React.FC<InfoPopUpFormProps> = ({control, errors}) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "infoPopUps",
    });


    const handleDeleteSlider = (index: number) => {
        remove(index);
    };

    const handleAddSlider = () => {
        append({ title: "" });
    };

    return <Accordion>
        <AccordionSummary
            expandIcon={<ArrowDownwardIcon/>}
        >
            <Typography component="span">Info Pop-up</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {fields.map((field, index) => (
                <Box key={field.id} sx={{ borderRadius: 1 }}>
                    <Controller
                        name={`infoPopUps[${index}].title`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Pop-up Title"
                                fullWidth
                                margin="normal"
                                error={!!errors?.sliderProps?.[index]?.name}
                                helperText={errors?.sliderProps?.[index]?.name?.message}
                            />
                        )}
                    />
                    <Controller
                        name={`infoPopUps[${index}].description`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Pop-up description"
                                fullWidth
                                margin="normal"
                                error={!!errors?.sliderProps?.[index]?.name}
                                helperText={errors?.sliderProps?.[index]?.name?.message}
                            />
                        )}
                    />
                    <Button variant="outlined" color="error" onClick={() => handleDeleteSlider(index)}>
                        Delete Pop-up
                    </Button>
                </Box>
            ))}

            <Button variant="contained" style={{marginTop: 10}} onClick={handleAddSlider} >
                Add New Pop-up
            </Button>

        </AccordionDetails>
    </Accordion>
}

export default InfoPopUpForm