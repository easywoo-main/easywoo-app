import {Avatar, ListItem, ListItemText} from "@mui/material";
import React from "react";
import {User} from "../../../type/user.type";


interface ChatMessageItemProgressTrackerProps {
    item: { id: string, user: User, createdAt: Date };
}

const ChatMessageItemProgressTracker: React.FC<ChatMessageItemProgressTrackerProps> = ({item}) => {
    return (
        <ListItem
            key={item.id}
            sx={{
                backgroundColor: 'inherit',
            }}
        >
            <Avatar alt={item.user.name} src={item.user.photo} sx={{m: 1}}/>
            <ListItemText
                primary={item.user.name}
                secondary={
                    <>
                        {item.user.email}
                    </>
                }
            />
            {/*<ListItemText*/}
            {/*    primary={*/}
            {/*        <Typography sx={{ fontWeight: 'bold' }}>*/}
            {/*            test*/}
            {/*        </Typography>*/}
            {/*    }*/}
            {/*/>*/}
            {new Date(item.createdAt).toLocaleString()}
        </ListItem>
    )
}

export default ChatMessageItemProgressTracker;