import React, {useState} from "react";
import {MessageChoice} from "../../../type/messageChoice.type";
import {deleteMessageChoice, updateMessageChoice} from "../../../api/messageChoice.service";
import AnswerModal from "./AnswerModal";
import {Dialog, Tab, Tabs} from "@mui/material";
import DeleteModal from "../../../components/DeleteModal";
import ProgressTracker from "./ProgressTracker";
import ChatMessageItemProgressTracker from "./ChatMessageItemProgresTracker";
import {PageRequestArgs} from "../../../utils/pageable.utils";
import {getPaginationResultMessageChoice} from "../../../api/resultMessageChoice.service";
import {ResultMessageChoice} from "../../../type/resultMessageChoice.type";

interface EditAnswerModalProps {
    answer: MessageChoice;
    onClose: () => void;
    onSubmit: (messageChoice: MessageChoice) => void
}

const EditAnswerModal: React.FC<EditAnswerModalProps> = ({answer, onClose, onSubmit}) => {
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

    const handleProgressTracker = async (option: PageRequestArgs) => {
        return getPaginationResultMessageChoice(answer.id, option);
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
                        name: answer.name, file: answer.file, prevMessageId: answer.prevMessageId,
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
                <ProgressTracker<ResultMessageChoice>
                    onClose={onClose}
                    getPaginationData={handleProgressTracker}
                    children={(item) => {
                        return <ChatMessageItemProgressTracker item={item}/>
                    }}
                />
            )}

        </Dialog>
    );
};

export default EditAnswerModal;
