import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    CircularProgress,
    Typography, Checkbox
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createChat } from "../../../api/chat.service";

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Chat name cannot be empty.'),
    freeSteps: Yup.number().min(0, 'Free steps must be a positive number or zero.').required('Free steps are required.'),
    price: Yup.number().min(0, 'Price must be a positive number or zero.').required('Price is required.'),
    landingUrl: Yup.string().url("Must be url").optional(),
    hasIndividualConsultation: Yup.boolean().default(false),
    isDisabled: Yup.boolean().default(false),
});

interface CreateChatModalProps {
    onClose: () => void;
}

const CreateChatModal: React.FC<CreateChatModalProps> = ({ onClose }) => {
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: '',
            freeSteps: 0,
            price: 0
        }
    });

    const onSubmit = async (data: any) => {
        setSaveLoading(true);
        try {
            await createChat(data);
            onClose();
        } catch (error) {
            setError('An error occurred while creating the chat.');
            console.error(error);
        } finally {
            setSaveLoading(false);
        }
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Create Chat</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                label="Chat Name"
                                {...field}
                                error={!!errors.name}
                                helperText={errors.name ? errors.name.message : ''}
                                variant="outlined"
                                sx={{ marginBottom: 2 }}
                            />
                        )}
                    />
                    <Controller
                        name="landingUrl"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                label="Ladning Url"
                                {...field}
                                error={!!errors.landingUrl}
                                helperText={errors.landingUrl ? errors.landingUrl.message : ''}
                                variant="outlined"
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
                                helperText={errors.freeSteps ? errors.freeSteps.message : ''}
                                variant="outlined"
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
                                helperText={errors.price ? errors.price.message : ''}
                                variant="outlined"
                                sx={{ marginBottom: 2 }}
                            />
                        )}
                    />
                    <Controller
                        name="hasIndividualConsultation"
                        control={control}
                        render={({ field }) => (
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                <Checkbox
                                    {...field}
                                    checked={field.value}
                                    color="primary"
                                />
                                <Typography>Has Individual Consultation</Typography>
                            </div>
                        )}
                    />
                    <Controller
                        name="isDisabled"
                        control={control}
                        render={({ field }) => (
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                <Checkbox
                                    {...field}
                                    checked={field.value}
                                    color="primary"
                                />
                                <Typography>Is Disabled</Typography>
                            </div>
                        )}
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <DialogActions>
                        <Button onClick={onClose} color="secondary">Cancel</Button>
                        <Button
                            type="submit"
                            color="primary"
                            disabled={saveLoading}
                        >
                            {saveLoading ? <CircularProgress size={24} /> : 'Create'}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateChatModal;
