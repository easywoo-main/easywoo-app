import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import ChatListPage from "./page/chatList/ChatListPage";
import React from "react";
import ChatMessageDetailsPage from "./page/chatDetails/ChatDetails";
import {QueryClient, QueryClientProvider} from 'react-query';

const App: React.FC = () => {
    const queryClient = new QueryClient();

    return (<QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/chat" element={<ChatListPage/>}/>
                    <Route path="/chat/:id" element={<ChatMessageDetailsPage/>}/>
                    <Route path="/" element={<Navigate to="/chat" replace/>}/>
                </Routes>
            </Router>
        </QueryClientProvider>

    );
};

export default App;
