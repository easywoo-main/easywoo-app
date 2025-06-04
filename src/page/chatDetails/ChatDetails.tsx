import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Chat} from "../../type/chat.type";
import {getChatById} from "../../api/chat.service";
import {Box, Button, CircularProgress, Container, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditChatModal from "../chatList/components/EditChatModal";
import CreateMessageModal from "./components/CreateMessageModal";
import ChatMessagesList from "./components/ChatMessagesList";

const ChatMessageDetailsPage: React.FC = () => {
    const [chat, setChat] = useState<Chat>();
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateMessageModalOpen, setIsCreateMessageModalOpen] = useState(false);
    const [isEditChatOpen, setIsEditChatOpen] = useState(false);
    const {id: chatId} = useParams<{ id: string }>();
    const navigate = useNavigate();


    useEffect(() => {
        getChat();
    }, [chatId]);

    const getChat = async () => {
        if (!chatId) return;
        setIsLoading(true);
        try {
            const chatData = await getChatById(chatId);
            setChat(chatData);
        } catch (error) {
            console.error("Failed to fetch chat:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddNewStep = async () => {
        await getChat();
    };

    const handleUpdateChat = async () => {
        await getChat();
    }

    return (
        <Box style={{width: "100%", height: "100%", margin: "0", padding: "0"}}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    // mb: 3,
                    width: "98vw",
                    pt: "16px",
                    pb: "16px",

                    backgroundColor: "#ebedeb",
                }}
            >
                <Button
                    variant="outlined"
                    onClick={() => navigate("/chat")}
                    startIcon={<ArrowBackIosIcon/>}
                />

                <Typography variant="h4">{chat?.name}</Typography>
                <Box>
                    <Button
                        variant="outlined"
                        sx={{mr: 1}}
                        onClick={() => setIsEditChatOpen(true)}
                        startIcon={<EditIcon/>}
                    >Edit</Button>
                    <Button variant="outlined" onClick={() => setIsCreateMessageModalOpen(true)}>
                        Add Step
                    </Button>
                </Box>
            </Box>


            {isLoading ? (
                <Box sx={{display: "flex", justifyContent: "center", mt: 4}}>
                    <CircularProgress/>
                </Box>
            ) : chat?.startMessageId ? (
                <ChatMessagesList chatId={chat.id}/>
            ) : (
                <Box sx={{textAlign: "center", mt: 4}}>
                    <Typography variant="h6" gutterBottom>
                        No start message found.
                    </Typography>
                    <Button variant="outlined" onClick={() => setIsCreateMessageModalOpen(true)}>
                        Add First Step
                    </Button>
                </Box>
            )}

            {isCreateMessageModalOpen &&
                <CreateMessageModal
                    onClose={() => setIsCreateMessageModalOpen(false)}
                    onSubmit={handleAddNewStep}
                    chatId={chatId!}
                    startingChatId={chatId}
                />
            }
            {isEditChatOpen &&
                <EditChatModal
                    onClose={() => setIsEditChatOpen(false)}
                    chat={chat!}
                    onSubmit={handleUpdateChat}
                />}
        </Box>
    );
};

export default ChatMessageDetailsPage;
