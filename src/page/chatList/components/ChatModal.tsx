import React, {useState} from 'react';
import {Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@mui/material';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {CreateUpdateChatDto} from '../../../type/chat.type';
import SliderForm from '../../chatDetails/components/SliderForm';
import {createUpdateSliderPropSchema} from '../../../schema/createUpdateSliderProp.schema';
import {CreateUpdateSliderPropDto} from "../../../type/messageSlider.type";
import {MATH_OPERATORS} from "../../../utils/constant.utils";
import ControlTextField from "../../../components/ControlTextField";
import ControlCheckbox from "../../../components/ControlCheckbox";
import TherapistForm from "./TherapistForm";

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Chat name cannot be empty.'),
    freeSteps: Yup.number().min(0, 'Free steps must be a positive number or zero.').required('Free steps are required.'),
    price: Yup.number().min(0, 'Price must be a positive number or zero.').required('Price is required.'),
    landingUrl: Yup.string().url("Must be url").optional(),
    hasIndividualConsultation: Yup.boolean().default(false),
    isDisabled: Yup.boolean().default(false),
    sliderProps: Yup.array().of(createUpdateSliderPropSchema).optional(),
    formula: Yup.string()
        .test(
            'is-contains-slider-name',
            'Unknown variable or operator',
            function (value) {
                console.log("this", this);
                if(!value) {
                    return true;
                }
                const sliderProps: CreateUpdateSliderPropDto[] = this.parent?.sliderProps;
                const sliderPropNames = sliderProps.map((prop) => prop.name);

                const partsEquation = [...sliderPropNames, ...MATH_OPERATORS];
                const escapedOperators = MATH_OPERATORS.map(op => '\\' + op).join('|');

                const regex = new RegExp(`(${escapedOperators})`, 'g');

                const parts = value.split(regex).filter(part => part.trim() !== '');
                console.log({
                    parts,
                    partsEquation
                });

                let openBrackets = 0;
                for (const part of parts) {
                    const trimPart = part.trim();

                    if (trimPart === '(') {
                        openBrackets++;
                    } else if (trimPart === ')') {
                        openBrackets--;
                        if (openBrackets < 0) {
                            return false;
                        }
                    }

                    if (!isNaN(Number(trimPart))) {
                        continue;
                    }

                    if (!partsEquation.includes(trimPart)) {
                        return false;
                    }
                }

                if (openBrackets !== 0) {
                    return false;
                }

                return true;
            }
        )
});


interface ChatModalProps {
    chat: CreateUpdateChatDto;
    onClose: () => void;
    onSubmit: (chat: CreateUpdateChatDto) => Promise<void>;
}

const ChatModal = ({ chat, onClose, onSubmit }: ChatModalProps) => {
    const [saveLoading, setSaveLoading] = useState(false);
    const [error, setError] = useState('');

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema) as any,
        defaultValues: chat,
    });

    const handleSave = async (data: CreateUpdateChatDto) => {
        setSaveLoading(true);
        try {
            await onSubmit(data);
            onClose();
        } catch (err) {
            console.error(err);
            setError('An error occurred while saving.');
        } finally {
            setSaveLoading(false);
        }
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Chat Details</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(handleSave)}>
                    <ControlTextField control={control} errors={errors} name="name" label="Chat Name"/>
                    <ControlTextField control={control} errors={errors} name="landingUrl" label="Landing Url"/>
                    <ControlTextField control={control} errors={errors} name="freeSteps" label="Free Steps"/>
                    <ControlTextField control={control} errors={errors} name="price" label="Price"/>
                    <ControlCheckbox control={control} name="hasIndividualConsultation"
                                     label="Has Individual Consultation"/>
                    <ControlCheckbox control={control} name="isDisabled" label="is Disabled"/>
                    <SliderForm control={control} errors={errors} />

                    <TherapistForm control={control} errors={errors} />
                    {error && <Typography color="error">{error}</Typography>}
                    <DialogActions>
                        <Button onClick={onClose} color="secondary">Cancel</Button>
                        <Button type="submit" color="primary" disabled={saveLoading}>
                            {saveLoading ? <CircularProgress size={24} /> : 'Save'}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ChatModal;
