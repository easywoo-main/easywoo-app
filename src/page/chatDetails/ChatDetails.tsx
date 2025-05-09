import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {createChatMessage} from "../../api/chatMessage.service";
import {Chat} from "../../type/chat.type";
import {getChatById} from "../../api/chat.service";
// import CreateEditMessageModal from "./components/CreateEditMessageModal";
import ChatTree from "./components/ChatTree";
import {Box, Button, CircularProgress, Container, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditChatModal from "../chatList/components/EditChatModal";
import CreateMessageModal from "./components/CreateMessageModal";
import SelectUserModal from "./components/SelectUserModal";
import {User} from "../../type/user.type";

const ChatMessageDetails: React.FC = () => {
    const [chat, setChat] = useState<Chat>();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateFirstChatMessageModalOpen, setIsCreateFirstChatMessageModalOpen] = useState(false);
    const [isEditChatOpen, setIsEditChatOpen] = useState(false);
    const [isOpenSelectUserModal, setIsOpenSelectUserModal] = useState(false);
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
                    <Button
                        variant="outlined"
                        onClick={() => setIsOpenSelectUserModal(true)}
                        startIcon={<PersonIcon/>}
                    >Users</Button>
                </Box>
            </Box>


            {isLoading ? (
                <Box sx={{display: "flex", justifyContent: "center", mt: 4}}>
                    <CircularProgress/>
                </Box>
            ) : chat?.startMessageId ? (
                <ChatTree chat={chat} users={users}/>
            ) : (
                <Box sx={{textAlign: "center", mt: 4}}>
                    <Typography variant="h6" gutterBottom>
                        No start message found.
                    </Typography>
                    <Button variant="outlined" onClick={() => setIsCreateFirstChatMessageModalOpen(true)}>
                        Add First Step
                    </Button>
                </Box>
            )}

            {isCreateFirstChatMessageModalOpen &&
                <CreateMessageModal
                    onClose={() => setIsCreateFirstChatMessageModalOpen(false)}
                    onSubmit={handleAddNewStep}
                    chatId={chatId}
                />
            }
            {isEditChatOpen &&
                <EditChatModal
                    onClose={() => setIsEditChatOpen(false)}
                    chat={chat!}
                    onSubmit={handleUpdateChat}
                />}

            {isOpenSelectUserModal &&
                <SelectUserModal
                    onClose={() => setIsOpenSelectUserModal(false)}
                    setSelectedUsers={setUsers}
                    selectedUsers={users}
                    chat={chat!}
                />
            }
        </Container>
    );
};

export default ChatMessageDetails;
