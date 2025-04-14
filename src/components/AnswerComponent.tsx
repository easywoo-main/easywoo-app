import React, { useState } from 'react';
import {TreeNode} from "../App";

// Оголошуємо типи пропсів для компонента
interface QuestionComponentProps {
    onAnswerAdd: (name: string) => void;
    treeNode: TreeNode;
}

const AnswerComponent: React.FC<QuestionComponentProps> = ({ onAnswerAdd, treeNode }) => {
    const [newName, setNewName] = useState<string>('');

    const handleAddAnswer = () => {
        if (newName) {
            onAnswerAdd(newName);
            setNewName('');
        }
    };

    return (
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="280" height="280" fill="#d3d3d3" stroke="#ccc" strokeWidth="2" rx="10" />

            <foreignObject x="10" y="10" width="270" height="150">
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        overflowY: 'auto',
                        wordWrap: 'break-word',
                        whiteSpace: 'pre-wrap',
                        padding: "5px"
                    }}
                >
                    <p><strong>Question:</strong> {treeNode.name}</p>
                </div>
            </foreignObject>

            <foreignObject x="10" y="180" width="270" height="40">
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Введіть відповідь"
                    style={{
                        width: '100%',
                        height: '100%',
                        fontSize: '14px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: "5px"

                    }}
                />
            </foreignObject>

            <foreignObject x="10" y="230" width="270" height="40">
                <button
                    onClick={handleAddAnswer}
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        padding: "5px"
                    }}
                >
                    Додати відповідь
                </button>
            </foreignObject>
        </svg>
    );
};

export default QuestionComponent;
