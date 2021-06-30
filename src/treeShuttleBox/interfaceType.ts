import { TreeProps } from "antd";

export type treeDataType = Required<Pick<TreeProps, "treeData">>;
export type onCheckType = Required<Pick<TreeProps, "onCheck">>;
export interface FunEntryType {
  treeData: any[];
  callback: (
    item: {
      title: string;
      key: string;
      children: any[];
      [key: string]: any;
    },
    index: number,
    parentId: string | null | number
  ) => void;
  replaceName?: string;
  parentId?: string | null | number;
}

export interface FlatEntryType extends treeDataType {
  treeData: any[];
  callback?: (
    item: {
      title: string;
      key: string;
      children: any[];
      [key: string]: any;
    },
    index: number
  ) => void;
  replaceName?: string;
}

export interface reorganizeEntryType {
  treeArr: Array<any>;
  id?: string | null | number;
  link?: string;
  idName?: string;
}
