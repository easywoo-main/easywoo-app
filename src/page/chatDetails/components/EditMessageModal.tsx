import React, {useState} from "react";
import {ChatMessage, ChatMessageWithRelations} from "../../../type/chatMessage";
import {deleteChatMessage, updateChatMessage} from "../../../api/chatMessage.service";
import MessageModal from "./MessageModal";
import DeleteModal from "../../../components/DeleteModal";
import {Dialog, Tab, Tabs} from "@mui/material";
import ProgressTracker from "./ProgressTracker";
import {StepChatMessage} from "../../../type/stepChatMessage.type";
import {getPaginationStepChatMessage} from "../../../api/stepChatMessage.service";
import {PageRequestArgs} from "../../../utils/pageable.utils";
import ChatMessageItemProgressTracker from "./ChatMessageItemProgresTracker";
import MessageChildren from "./MessageChildren";

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
                <Tab value="two" label="Users"/>
                <Tab value="tree" label="Previous Message"/>
            </Tabs>

            {tab === "one" && (<>
            <MessageModal
                saveMessage={handleSave}
                onClose={onClose}
                onDelete={() => setIsOpenDeleteModal(true)}
                message={{
                    name: message.name,
                    type: message.type,
                    isCheckpoint: message.isCheckpoint,
                    files: message.files,
                    timeout: message.timeout,
                    isAllowManualTime: message.isAllowManualTime,
                    isOfferRestart: message.isOfferRestart,
                    infoPopUps: message.infoPopUps?.map((item)=>{
                        return {id: item.id, title: item.title, description: item.description};
                    }) || []
                }}/>
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
                <ProgressTracker<StepChatMessage>
                    onClose={onClose}
                    getPaginationData={handleProgressTracker}
                    children={(item) => {
                        return <ChatMessageItemProgressTracker item={item}/>
                    }}
                />
            )}

            {tab === "tree" && (
                <MessageChildren message={message}  onClose ={onClose}/>
            )}
        </Dialog>
    );
};

export default EditMessageModal;
