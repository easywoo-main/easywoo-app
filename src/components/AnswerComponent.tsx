import React, { useState } from 'react';
import {AnswerNode} from "../type";

// Оголошуємо типи пропсів для компонента
interface QuestionComponentProps {
    onAnswerAdd: (nodeId: string) => void;
    treeNode: AnswerNode;
}

const AnswerComponent: React.FC<QuestionComponentProps> = ({ onAnswerAdd, treeNode }) => {
    return (
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="280" height="280" stroke="#e0e0e0" strokeWidth="2" rx="10" />

            <foreignObject x="10" y="10" width="260" height="200">
                <div
                    style={{
                        height: '100%',
                        overflowY: 'auto',
                        wordWrap: 'break-word',
                        whiteSpace: 'pre-wrap',
                        padding: "5px"
                    }}
                >
                    <p><strong>Answer:</strong> {treeNode.name}</p>
                </div>
            </foreignObject>


            <foreignObject x="10" y="230" width="260" height="40">
                <button
                    // onClick={ha}
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
                    Edit Answer
                </button>
            </foreignObject>
        </svg>
    );
};

export default AnswerComponent;
