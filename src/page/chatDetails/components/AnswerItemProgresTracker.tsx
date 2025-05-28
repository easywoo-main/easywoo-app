import {Avatar, ListItem, ListItemText} from "@mui/material";
import React from "react";
import {StepChatMessage} from "../../../type/stepChatMessage.type";


interface AnswerItemProgressTrackerProps {
    stepChatMessage: StepChatMessage;
}
const AnswerItemProgressTracker: React.FC<AnswerItemProgressTrackerProps> = ({stepChatMessage}) => {
    return (
        <ListItem
            key={stepChatMessage.id}
            sx={{
                backgroundColor: 'inherit',
            }}
        >
            <Avatar alt={stepChatMessage.user.name} src={stepChatMessage.user.photo} sx={{ m: 1 }} />
            <ListItemText
                primary={stepChatMessage.user.name}
                secondary={
                    <>
                        {stepChatMessage.user.email}
                    </>
                }
            />
            {new Date(stepChatMessage.createdAt).toLocaleString()}
        </ListItem>
    )
}

export default AnswerItemProgressTracker;