import {MessageType} from "../../../type/chatMessage";
import {CreateUpdateInfoPopUpType} from "../../../schema/createUpdateInfoPopUp.schema";

export interface TreeNode {
    name: string;
    attributes: any;
    children: TreeNode[];
}



export enum SliderPropType {
    NEGATIVE = "NEGATIVE",
    POSITIVE = "POSITIVE",
}

