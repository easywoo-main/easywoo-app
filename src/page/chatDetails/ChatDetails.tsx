import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {createChatMessage} from "../../api/chatMessage.service";
import {Chat} from "../../type/chat.type";
import {getChatById} from "../../api/chat.service";
import CreateEditMessageModal from "./components/CreateEditMessageModal";
import {CreateUpdateChatMessageDto} from "./type";
import ChatTree from "./components/ChatTree";
import {Box, Button, CircularProgress, Container, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ChatMessageDetails: React.FC = () => {
    const [chat, setChat] = useState<Chat>();
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleAddNewStep = async (newStep: CreateUpdateChatMessageDto) => {
        if (!chat) return;
        await createChatMessage({...newStep, chatId: chat.id});
        setIsModalOpen(false);
        await getChat();
    };

    return (
        <Container style={{width: "100vw", height: "100vh", margin: "0", padding: "0"}}>
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
                    startIcon={<ArrowBackIosIcon />}
                />

                <Typography variant="h4">{chat?.name}</Typography>
                <Box />
            </Box>


            {isLoading ? (
                <Box sx={{display: "flex", justifyContent: "center", mt: 4}}>
                    <CircularProgress/>
                </Box>
            ) : chat?.startMessageId ? (
                <ChatTree chat={chat}/>
            ) : (
                <Box sx={{textAlign: "center", mt: 4}}>
                    <Typography variant="h6" gutterBottom>
                        No start message found.
                    </Typography>
                    <Button variant="outlined" onClick={() => setIsModalOpen(true)}>
                        Add First Step
                    </Button>
                </Box>
            )}

            {isModalOpen && (
                <CreateEditMessageModal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddNewStep}
                />
            )}
        </Container>
    );
};

export default ChatMessageDetails;
