import React, {useState} from "react";
import {
    ChatMessage,
    ChatMessageDto,
    ChatMessageWithPrevMessage,
    ChatMessageWithRelations
} from "../../../type/chatMessage";
import {deleteChatMessage, getAllByChatMessageId, updateChatMessage} from "../../../api/chatMessage.service";
import MessageModal from "./MessageModal";
import DeleteModal from "../../../components/DeleteModal";
import {Dialog, Tab, Tabs} from "@mui/material";
import ProgressTracker from "./ProgressTracker";
import {getPaginationStepChatMessage} from "../../../api/stepChatMessage.service";
import {PageRequestArgs} from "../../../utils/pageable.utils";
import ChatMessageItemProgressTracker from "./ChatMessageItemProgresTracker";
import MessageChildren from "./MessageChildren";
import AnswerChildren from "./AnswerChildren";

interface EditMessageModalProps {
    onClose: () => void;
    onSubmit: (newMessage: ChatMessage) =>  Promise<void>;
    message: ChatMessageWithRelations;
}

const EditMessageModal: React.FC<EditMessageModalProps> = ({onClose, onSubmit, message}) => {
    console.log(message)
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


    const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
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

    const selectionCondition = (chatMessage: ChatMessageWithPrevMessage)=>{
        return chatMessage.prevMessages?.some(prev => prev.id === message.id)  || false
    }

    return (<Dialog open onClose={onClose} maxWidth="md" fullWidth>
            <Tabs
                value={tab}
                onChange={handleChangeTab}
                aria-label="wrapped label tabs example"
            >
                <Tab
                    value="one"
                    label="Edit message"
                    // wrapped
                />
                {/*<Tab value="two" label="Users"/>*/}
                <Tab value="tree" label="Next Message"/>
                <Tab value="four" label="Next Answers"/>

            </Tabs>

            {tab === "one" && (<>
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
                        timeout: message.timeout,
                        type: message.type,
                        isCourseEnd: message.isCourseEnd,
                        isOfferRestart: message.isOfferRestart,
                        isAllowManualTime: message.isAllowManualTime,
                        isComment: message.isComment,
                        isBarometer: message.isBarometer,

                        nextMessageId: message.nextMessageId,
                        chatId: message.chatId,
                        sliderPropIds: message.sliderProps?.map(item => (item.id)) || [],
                    }}
                />

            {isOpenDeleteModal &&
                <DeleteModal
                    onDelete={handleDeleteMessage}
                    onClose={() => setIsOpenDeleteModal(false)}
                    title="Delete Message"
                    content='Are you sure you want to delete the message "{message.name}?'
                />
            }
            </>)}

            {tab === "two" && (
                <ProgressTracker
                    onClose={onClose}
                    getPaginationData={handleProgressTracker}
                    children={(item) => {
                        return <ChatMessageItemProgressTracker item={item}/>
                    }}
                />
            )}

            {tab === "tree" && (
                <MessageChildren chatId={message.chatId} messageId={message.id}  onClose ={onClose} getData={getChildrenData} updateData={updateChildrenRelation} selectionCondition={selectionCondition}/>
            )}

            {tab === "four" && (
                <AnswerChildren message={message}  onClose ={onClose}/>
            )}
        </Dialog>
    );
};

export default EditMessageModal;
