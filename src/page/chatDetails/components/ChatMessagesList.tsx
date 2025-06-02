import React, {useEffect, useState} from 'react';
import {getAllByChatMessageId} from '../../../api/chatMessage.service';
import {ChatMessageWithChoices} from '../../../type/chatMessage';
import MessageCard from './MessageCard';
import Pagination from "../../../components/Pagionation";
import {PageRequestArgs} from "../../../utils/pageable.utils";

const ChatMessagesList: React.FC<{ chatId: string }> = ({chatId}) => {

    const fetchMessages = async (pageRequest: PageRequestArgs) => {
        return getAllByChatMessageId({chatId, ...pageRequest, sortBy: {stepId: "desc"}});
    };
    return (
        <Pagination<ChatMessageWithChoices>
            fetchData={fetchMessages}
            render={(message: ChatMessageWithChoices, onRefresh: () => void) => (
                <MessageCard
                    key={message.id}
                    message={message}
                    onUpdate={onRefresh}
                />
            )}
        />
    );
};

export default ChatMessagesList;
