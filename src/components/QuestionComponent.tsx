import React from 'react';
import {CreateTreeNodeDto, QuestionNode, TreeNodeType} from "../type";

// Оголошуємо типи пропсів для компонента
interface QuestionComponentProps {
    onAnswerAdd: (nodeId: string) => void;
    treeNode: QuestionNode;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ onAnswerAdd, treeNode }: QuestionComponentProps) => {
    const handleAddAnswer = () => {
        onAnswerAdd(treeNode.id);
    };

    return (
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="280" height="280" fill="#d3d3d3" stroke="#ccc" strokeWidth="2" rx="10" />

            <foreignObject x="10" y="10" width="260" height="200">
                <div
                    style={{
                        // width: '270',
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


            <foreignObject x="10" y="230" width="260" height="40">
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
                    Edit Question
                </button>
            </foreignObject>
        </svg>
    );
};

export default QuestionComponent;
