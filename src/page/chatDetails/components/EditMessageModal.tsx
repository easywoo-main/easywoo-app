import React, {useState} from "react";
import {
    ChatMessage,
    ChatMessageDto,
    ChatMessageWithPrevMessage,
    ChatMessageWithRelations
} from "../../../type/chatMessage";
import {deleteChatMessage, getAllByChatMessageId, updateChatMessage} from "../../../api/chatMessage.service";
import MessageModal from "./MessageModal";
import {Dialog} from "@mui/material";
import {getPaginationStepChatMessage} from "../../../api/stepChatMessage.service";
import {PageRequestArgs} from "../../../utils/pageable.utils";

interface EditMessageModalProps {
    onClose: () => void;
    onSubmit: (newMessage: ChatMessage) =>  Promise<void>;
    message: ChatMessageWithRelations;
}

const EditMessageModal: React.FC<EditMessageModalProps> = ({onClose, onSubmit, message}) => {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [tab, setTab] = React.useState("one");

    const handleSave = async (data: any) => {
        const newChatMessage = await updateChatMessage(message.id, data);
        await onSubmit(newChatMessage);
        onClose();
    };

    const handleDeleteMessage = async () => {
        const deletedMessage = await deleteChatMessage(message.id)
        await onSubmit(deletedMessage);
        onClose();
    }


    const handleChangeTab = (_event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    const handleProgressTracker = async (option: PageRequestArgs) => {
        return getPaginationStepChatMessage(message.id, option);
    }

    const {...chatMessageDto}: ChatMessageDto = message;
    console.log(chatMessageDto)

    const getChildrenData = async  (search: string)=> {
        return getAllByChatMessageId({search, chatId: message.chatId, chatMessageId: message.id});
    }

    const updateChildrenRelation = async (nextMessageId: string | null)=>{
        await updateChatMessage(message.id, { nextMessageId });
    }
    const updateRestartMessage =async (restartMessageId: string | null)=>{
        await updateChatMessage(message.id, { restartMessageId });
    }

    const selectionCondition = (chatMessage: ChatMessageWithPrevMessage)=>{
        return chatMessage.prevMessages?.some(prev => prev.id === message.id)  || false
    }

    const restartSelectionCondition = (chatMessage: ChatMessageWithPrevMessage)=>{
        return chatMessage.id  === message.restartMessageId;
    }

    return (<Dialog open onClose={onClose} maxWidth="md" fullWidth>
                <MessageModal
                    saveMessage={handleSave}
                    onClose={onClose}
                    onDelete={() => setIsOpenDeleteModal(true)}
                    chatMessageId={message.id}
                    chatId={message.chatId}
                    message={{
                        stepName: message.stepName,
                        introText: message.introText || '',
                        introImages: message.introImages || [],
                        introMedias: message.introMedias || [],
                        question: message.question || '',
                        todoList: message.todoList || [],
                        images: message.images || [],
                        medias: message.medias || [],
                        timeouts: message.timeouts,
                        type: message.type,
                        isCourseEnd: message.isCourseEnd,
                        isOfferRestart: message.isOfferRestart,
                        isAllowManualTime: message.isAllowManualTime,
                        isComment: message.isComment,
                        isBarometer: message.isBarometer,
                        stepId: message.stepId,
                        nextMessageId: message.nextMessageId,
                        chatId: message.chatId,
                        sliderPropIds: message.sliderProps?.map(item => (item.id)) || [],
                        answers: []
                    }}
                />

        </Dialog>
    );
};

export default EditMessageModal;
