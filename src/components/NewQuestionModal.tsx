import React, {useState} from "react";
import {CreateTreeNodeDto, QuestionNode, TreeNodeType} from "../type";

interface AddQuestionModalProps {
    isOpen: boolean;
    nodeId: string;
    onClose: () => void;
    onSubmit: (question: { question: string; type: string }) => void;
    addChildren: (newNodeDto: CreateTreeNodeDto) => void;
}

const NewQuestionModal: React.FC<AddQuestionModalProps> = ({
                                                               isOpen,
                                                               nodeId,
                                                               onClose,
                                                               onSubmit,
                                                               addChildren
                                                           }) => {
    const [question, setQuestion] = useState<string>("");
    const [questionType, setQuestionType] = useState<string>("single");

    const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(e.target.value);
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionType(e.target.value);
    };

    const handleSubmit = () => {
        if (question.trim() !== "") {
            onSubmit({ question, type: questionType });
            setQuestion("");
            setQuestionType("single");
            onClose();
        } else {
            alert("Питання не може бути порожнім");
        }
    };
    const handleAddAnswer = ()=>{
        addChildren({name: "New answer", type: TreeNodeType.ANSWER, parentId: nodeId})
    }
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Додати нове питання</h2>
                <textarea
                    value={question}
                    onChange={handleQuestionChange}
                    placeholder="Введіть ваше питання"
                    rows={4}
                    className="textarea"
                />
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            name="questionType"
                            value="single"
                            checked={questionType === "single"}
                            onChange={handleRadioChange}
                        />
                        Одне відповідь (Single)
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="questionType"
                            value="multiple"
                            checked={questionType === "multiple"}
                            onChange={handleRadioChange}
                        />
                        Багато відповідей (Multiple)
                    </label>
                </div>
                <div className="modal-actions">
                    <button onClick={onClose}>Close</button>
                    <button onClick={handleSubmit}>Edit</button>
                    <button onClick={handleAddAnswer}>Add answer</button>

                </div>
            </div>
        </div>
    );
};

export default NewQuestionModal;
