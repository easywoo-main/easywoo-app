import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import ChatListPage from "./page/chatList/ChatListPage";
import React from "react";
import ChatMessageDetails from "./page/chatDetails/ChatDetails";

const App: React.FC = () => {

    return (
        <Router>
            <Routes>
                <Route path="/chat" element={<ChatListPage />} />
                 <Route path="/chat/:id" element={<ChatMessageDetails />} />
                <Route path="/" element={<Navigate to="/chat" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
