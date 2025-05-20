import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {useFieldArray} from "react-hook-form";
import {Box, Button} from "@mui/material";
import ControlTextField from "../../../components/ControlTextField";


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
                    <ControlTextField control={control} errors={errors} name={`infoPopUps[${index}].title`} label="Pop-up Title"/>
                    <ControlTextField control={control} errors={errors} name={`infoPopUps[${index}].description`} label="Pop-up description"/>
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