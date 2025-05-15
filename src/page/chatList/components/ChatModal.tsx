import React, { useState } from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, CircularProgress, Typography, Checkbox
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {CreateUpdateChatDto} from '../../../type/chat.type';
import SliderForm from '../../chatDetails/components/SliderForm';
import { createUpdateSliderPropSchema } from '../../../schema/createUpdateSliderProp.schema';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Chat name cannot be empty.'),
    freeSteps: Yup.number().min(0, 'Free steps must be a positive number or zero.').required('Free steps are required.'),
    price: Yup.number().min(0, 'Price must be a positive number or zero.').required('Price is required.'),
    landingUrl: Yup.string().url("Must be url").optional(),
    hasIndividualConsultation: Yup.boolean().default(false),
    isDisabled: Yup.boolean().default(false),
    sliderProps: Yup.array().of(createUpdateSliderPropSchema).optional(),
});

interface ChatModalProps {
    chat: CreateUpdateChatDto;
    onClose: () => void;
    onSubmit: (chat: CreateUpdateChatDto) => Promise<void>;
}

const ChatModal = ({ chat, onClose, onSubmit }: ChatModalProps) => {
    const [saveLoading, setSaveLoading] = useState(false);
    const [error, setError] = useState('');
    console.log(yupResolver(validationSchema));

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
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                label="Chat Name"
                                {...field}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                sx={{ marginBottom: 2 }}
                            />
                        )}
                    />
                    {/* Інші поля... */}
                    <Controller
                        name="landingUrl"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                label="Landing Url"
                                {...field}
                                error={!!errors.landingUrl}
                                helperText={errors.landingUrl?.message}
                                sx={{ marginBottom: 2 }}
                            />
                        )}
                    />
                    <Controller
                        name="freeSteps"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                label="Free Steps"
                                type="number"
                                {...field}
                                error={!!errors.freeSteps}
                                helperText={errors.freeSteps?.message}
                                sx={{ marginBottom: 2 }}
                            />
                        )}
                    />
                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                label="Price"
                                type="number"
                                {...field}
                                error={!!errors.price}
                                helperText={errors.price?.message}
                                sx={{ marginBottom: 2 }}
                            />
                        )}
                    />
                    <Controller
                        name="hasIndividualConsultation"
                        control={control}
                        render={({ field }) => (
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                <Checkbox {...field} checked={field.value} />
                                <Typography>Has Individual Consultation</Typography>
                            </div>
                        )}
                    />
                    <Controller
                        name="isDisabled"
                        control={control}
                        render={({ field }) => (
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                <Checkbox {...field} checked={field.value} />
                                <Typography>Is Disabled</Typography>
                            </div>
                        )}
                    />
                    <SliderForm control={control} errors={errors} />

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
