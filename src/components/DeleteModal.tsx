import React, {useState} from "react";
import {Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

interface DeleteModalProps {
    onClose: () => void;
    onDelete: () => void;
    title: string;
    content: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({onClose, onDelete, title, content}) => {
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const handleDelete = async () => {
        setIsDeleteLoading(false)
        try{
            await onDelete()
            onDelete()
        }catch (error) {
            console.error(error);
            setError("Error");
        } finally {
            setIsDeleteLoading(false)
        }
    }

    return <Dialog open onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <Typography>{content}</Typography>
        </DialogContent>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <DialogActions>
            <Button onClick={onClose} color="secondary">Cancel</Button>
            <Button onClick={handleDelete} variant="contained" disabled={isDeleteLoading}>
                {isDeleteLoading ? <CircularProgress size={24} /> : 'Delete'}
            </Button>
        </DialogActions>
    </Dialog>
}

export default DeleteModal