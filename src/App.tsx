import React, { useState, useRef } from "react";
import Tree from "react-d3-tree";
import QuestionComponent from "./components/QuestionComponent";
import {CreateTreeNodeDto, TreeNode, TreeNodeType} from "./type";
import NewQuestionModal from "./components/NewQuestionModal";
import AnswerComponent from "./components/AnswerComponent";
import NewAnswerModal from "./components/NewAnswerModal";
// import NewAnswerModal from "./components/NewAnswerModal";


const generateId = () => Math.random().toString(36).substr(2, 9);

const App: React.FC = () => {
    const [treeData, setTreeData] = useState<TreeNode[]>([
        {
            id: "root",
            name: "Стартове питання",
            type: TreeNodeType.QUESTION,
            children: [
                {
                    id: "1",
                    name: "Стартове питання",
                    type: TreeNodeType.ANSWER,
                    children: [],
                },
                {
                    id: "2",
                    name: "Стартове питання",
                    type: TreeNodeType.ANSWER,
                    children: [],
                },
                {
                    id: "3",
                    name: "Стартове питання",
                    type: TreeNodeType.ANSWER,
                    children: [
                        {
                            id: "4",
                            name: "Стартове питання",
                            type: TreeNodeType.QUESTION,
                            children: [],
                        },
                    ],
                },
            ],
        },
    ]);
    const treeRef = useRef<HTMLDivElement>(null);
    const [isNewQuestionModalModalOpen, setIsNewQuestionModalModalOpen] = useState<boolean>(false);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [questions, setQuestions] = useState<
        { question: string; type: string }[]
    >([]);

    const handleNewQuestionModalModalOpen = (nodeId: string) => {
        console.log("test")
        setSelectedNodeId(nodeId)
        console.log(nodeId);
        setIsNewQuestionModalModalOpen(true);
    };

    const handleNewQuestionModalModalClose = () => {
        setSelectedNodeId(null)
        setIsNewQuestionModalModalOpen(false);
    };

    const handleAddQuestion = (newQuestion: { question: string; type: string }) => {
        setQuestions([...questions, newQuestion]);
    };

    const addChild = (newNodeDto: CreateTreeNodeDto) => {
        const addRecursive = (nodes: TreeNode[]): TreeNode[] => {
            return nodes.map((node: TreeNode): TreeNode => {
                if (node.id === newNodeDto.parentId) {
                    const newNode = { id: generateId(), name: newNodeDto.name, type: newNodeDto.type, children: []};
                    if ([TreeNodeType.ANSWER, TreeNodeType.TEXT].includes(node.type))    {
                        return {...node, children: [newNode]};

                    }
                     return {...node, children: [...node.children, newNode]};
                }
                return {...node, ...(node.children ? {children: addRecursive(node.children)}: []) };
            })
        };

        setTreeData((prev) => addRecursive(prev));
    };

    return (
        <div style={{ width: "100vw", height: "100vh" }} ref={treeRef}>
            <Tree
                data={treeData}
                translate={{ x: window.innerWidth / 2, y: 100 }}
                zoomable
                collapsible={false}
                nodeSize={{ x: 400, y: 400 }}
                orientation="vertical"
                renderCustomNodeElement={({nodeDatum})=>{
                    const nodeData = nodeDatum as any
                    console.log(nodeData.type);
                    if (nodeData.type === TreeNodeType.QUESTION) {
                        return <QuestionComponent onAnswerAdd={handleNewQuestionModalModalOpen}  treeNode={nodeDatum as any}/>
                    }
                    return (
                        <AnswerComponent onAnswerAdd={handleNewQuestionModalModalOpen}  treeNode={nodeDatum as any}/>
                    );
                }}
            />
            <div style={{   position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "#fff",
                borderRadius: 4 }}>
                <NewQuestionModal
                    isOpen={isNewQuestionModalModalOpen}
                    onClose={handleNewQuestionModalModalClose}
                    onSubmit={handleAddQuestion}
                    addChildren={addChild}
                    nodeId={selectedNodeId!}
                />
                <NewAnswerModal
                    isOpen={isNewQuestionModalModalOpen}
                    onClose={handleNewQuestionModalModalClose}
                    onSubmit={(nodeId, answer)=> console.log(nodeId, answer)}
                />
            </div>

        </div>
    );
};

export default App;