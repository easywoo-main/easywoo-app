export enum TreeNodeType {
    ANSWER = "ANSWER",
    QUESTION = "QUESTION",
    TEXT = "TEXT",
}

export interface TreeNode {
    id: string;
    name: string;
    type: TreeNodeType;
    children: TreeNode[];
}

export interface AnswerNode extends TreeNode {
    type: TreeNodeType.ANSWER;
    children: TextNode[] | QuestionNode[];
}

export interface TextNode extends TreeNode {
    type: TreeNodeType.TEXT;
    children: TextNode[] | QuestionNode[];
}

export interface QuestionNode extends TreeNode {
    type: TreeNodeType.QUESTION;
    children: AnswerNode[];
}

export interface CreateTreeNodeDto {
    parentId: string;
    name: string;
    type: TreeNodeType;

}