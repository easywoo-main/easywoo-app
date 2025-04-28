import React from "react";
import {
    Box, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import {MessageType} from "../../../type/chatMessage";
import NewTextForm from "./NewTextForm";
import NewFileForm from "./NewFileForm";
import NewChallengeForm from "./NewChallengeForm";
import {CreateUpdateAnswerDto} from "../type";

interface CreateEditAnswerModalProps {
    answer?: CreateUpdateAnswerDto | null;
}

const CreateEditAnswerModal: React.FC<CreateEditAnswerModalProps>  = ({}) => {
    return (
        <div></div>
    )
}


export default CreateEditAnswerModal