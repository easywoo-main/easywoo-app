import React, {useState} from "react";
import {MessageChoice} from "../../../type/messageChoice.type";
import {deleteMessageChoice, updateMessageChoice} from "../../../api/messageChoice.service";
import AnswerModal from "./AnswerModal";
import {Dialog, Tab, Tabs} from "@mui/material";
import DeleteModal from "../../../components/DeleteModal";
import MessageChildren from "./MessageChildren";
import {getAllByChatMessageId, updateChatMessage} from "../../../api/chatMessage.service";
import {ChatMessage, ChatMessageWithPrevMessage, ChatMessageWithRelations} from "../../../type/chatMessage";

interface EditAnswerModalProps {
    answer: MessageChoice;
    onClose: () => void;
    onSubmit: (messageChoice: MessageChoice) => void
    chatId: string;
}

const EditAnswerModal: React.FC<EditAnswerModalProps> = ({answer, onClose, onSubmit, chatId}) => {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [tab, setTab] = React.useState("one");

    const handleDeleteMessage = async () => {
        const deletedMessage = await deleteMessageChoice(answer.id)
        onSubmit(deletedMessage);
        onClose();
    }

    const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    const handleSave = async (data: any) => {
        const updatedMessageChoice = await updateMessageChoice(answer.id, data);
        onSubmit(updatedMessageChoice)
    };

    const getChildrenData = async  (search: string)=> {
        return getAllByChatMessageId({search, chatId, messageChoiceId: answer.id});
    }

    const updateChildrenRelation = async (nextMessageId: string | null)=>{
        await updateMessageChoice(answer.id, { nextMessageId });
    }

    const selectionCondition = (chatMessage: ChatMessageWithPrevMessage) => {
        return chatMessage.prevChoices?.some(prevMessage => prevMessage.id === answer.id) || false;
    }

    return (<Dialog open onClose={onClose} maxWidth="md" fullWidth>
            <Tabs
                value={tab}
                onChange={handleChangeTab}
                aria-label="wrapped label tabs example"
            >
                <Tab
                    value="one"
                    label="Edit answer"
                    wrapped
                />
                <Tab value="two" label="Answer details"/>
            </Tabs>
            {tab === "one" && <>
                <AnswerModal
                    onClose={onClose}
                    saveMessage={handleSave}
                    answer={{
                        name: answer.name, text: answer.text, file: answer.file, prevMessageId: answer.prevMessageId,
                    }}
                />
                {isOpenDeleteModal &&
                    <DeleteModal
                        onDelete={handleDeleteMessage}
                        onClose={() => setIsOpenDeleteModal(false)}
                        title="Delete Answer"
                        content='Are you sure you want to delete the answer "{answer.name}?'
                    />}
            </>}


            {tab === "two" && (
                <MessageChildren chatId={chatId} messageId={answer.id}  onClose ={onClose} getData={getChildrenData} updateData={updateChildrenRelation} selectionCondition={selectionCondition}/>
            )}

        </Dialog>
    );
};

export default EditAnswerModal;
