import React, {useState} from 'react';
import {Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@mui/material';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {CreateUpdateChatDto} from '../../../type/chat.type';
import SliderForm from '../../chatDetails/components/SliderForm';
import ControlTextField from "../../../components/ControlTextField";
import ControlCheckbox from "../../../components/ControlCheckbox";
import TherapistForm from "./TherapistForm";
import {AxiosError} from "axios";
import { validationSchema } from '../../../schema/createUpdateChat.schema';
import PaintPointSelect from "./PaintPointSelect";


interface ChatModalProps {
    chat: CreateUpdateChatDto;
    onClose: () => void;
    onSubmit: (chat: CreateUpdateChatDto) => Promise<void>;
}

const ChatModal = ({ chat, onClose, onSubmit }: ChatModalProps) => {
    const [saveLoading, setSaveLoading] = useState(false);
    const [error, setError] = useState('');

    const { control, handleSubmit, formState: { errors } } = useForm<CreateUpdateChatDto>({
        resolver: yupResolver(validationSchema) as any,
        defaultValues: chat,
    });

    const handleSave = async (data: CreateUpdateChatDto) => {
        setSaveLoading(true);
        try {
            await onSubmit(data);
            onClose();
        } catch (err: AxiosError | any) {
            console.log(err?.response?.data?.message);
            setError(err?.response?.data?.message || 'An error occurred while saving.');
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
                    <ControlCheckbox control={control} name="isDisabled" label="Is Disabled"/>
                    <SliderForm control={control} errors={errors} />
                    <PaintPointSelect
                        control={control}
                        errors={errors}
                        // paintPointsOptions={paintPointsData}
                    />
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
