import React from "react";
import {PageRequestArgs} from "../../../utils/pageable.utils";
import Pagination from "../../../components/Pagionation";
import {getPaginationChat} from "../../../api/chat.service";
import {Chat} from "../../../type/chat.type";
import ChatItem from "./ChatItem";

const ChatMessagesList: React.FC = () => {
    const fetchChats = async (pageRequest: PageRequestArgs) => {
        return getPaginationChat(pageRequest);
    };

    return (
        <Pagination
            fetchData={fetchChats}
            render={(chat: Chat, onRefresh: () => void) => (
                <ChatItem
                    key={chat.id}
                    chat={chat}
                    onUpdateChat={onRefresh}
                />
            )}
        />
    );
};

export default ChatMessagesList;