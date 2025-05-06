import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    CircularProgress,
    Typography
} from '@mui/material';
import { Chat } from '../../../type/chat.type';
import { updateChat } from "../../../api/chat.service";
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Chat name cannot be empty.'),
    freeSteps: Yup.number().min(0, 'Free steps must be a positive number or zero.').required('Free steps are required.'),
    price: Yup.number().min(0, 'Price must be a positive number or zero.').required('Price is required.')
});

interface EditChatModalProps {
    chat: Chat;
    onClose: () => void;
    onSubmit: (chat: Chat) => void;
}

const EditChatModal: React.FC<EditChatModalProps> = ({ chat, onClose, onSubmit }) => {
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: chat.name,
            freeSteps: chat.freeSteps,
            price: chat.price
        }
    });

    const handleSave = async (data: any) => {
        setSaveLoading(true);
        try {
            const updatedChat = await updateChat(chat.id, { ...chat, ...data });
            onSubmit(updatedChat)
            onClose();
        } catch (error) {
            setError('An error occurred while updating the chat.');
            console.error(error);
        } finally {
            setSaveLoading(false);
        }
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Edit Chat</DialogTitle>
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
                                helperText={errors.name ? errors.name.message : ''}
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
                    {error && <Typography color="error">{error}</Typography>}
                    <DialogActions>
                        <Button onClick={onClose} color="secondary">Cancel</Button>
                        <Button
                            type="submit"
                            color="primary"
                            disabled={saveLoading}
                        >
                            {saveLoading ? <CircularProgress size={24} /> : 'Save'}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditChatModal;
