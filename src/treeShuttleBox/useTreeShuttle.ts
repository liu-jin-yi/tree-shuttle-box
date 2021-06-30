import React, { useState } from "react";
import { treeDataType } from "./interfaceType";
function useTreeShuttle() {
  const [finallyValue, setFinallyValue] = useState<Array<string>>([]); // 最终返回给用户的key数组
  const handleFinallyValueChange = (value: string[]) => {
    setFinallyValue(value);
  };

  const [defaultValue, setDefaultValue] = useState<string[]>([]); // 主要用于保存默认值
  const handleDefaultValueChange = (arr: string[]) => {
    setDefaultValue(arr);
  };

  const [sonParMap, setSonParMap] = useState<Map<string, string | null>>(
    new Map()
  ); // 保存子节点key和父节点key的Map，主要用于子级查找父级
  const handleSonParMapChange = (map: Map<string, string | null>) => {
    setSonParMap(map);
  };

  const [flatArray, setFlatArray] = useState<any[]>([]); // 保存展平的树数据，用于重组树形结构
  const handleFlatArrayChange = (value: any[]) => {
    setFlatArray(value);
  };

  // 左边的树形选择框
  const [checkListLeft, setCheckListLeft] = useState<string[]>([]); // 存储左侧选择框选中的key
  const handleCheckListLeftChange = (value: string[]) => {
    setCheckListLeft(value);
  };
  const [isBrightLeft, setIsBrightLeft] = useState<boolean>(false); // 控制左侧按钮是否高亮
  const handleIsBrightLeftChange = (isBright: boolean) => {
    setIsBrightLeft(isBright);
  };

  const [readOnlyAllKeyLeft, setReadOnlyAllKeyLeft] = useState<string[]>([]); // readonly 左边全部的key
  const handleReadOnlyAllKeyLeftChange = (arr: string[]) => {
    setReadOnlyAllKeyLeft(arr);
  };

  const [indeterminateLeft, setIndeterminateLeft] = useState<boolean>(false); // 主要处理左侧的半选
  const handleIndeterminateLeftChange = (boo: boolean) => {
    setIndeterminateLeft(boo);
  };

  const [dataSourceLeft, setDataSourceLeft] = useState<treeDataType>({
    treeData: [],
  }); // 左侧树形选择框的数据源
  const handleDataSourceLeftChange = ({ treeData }: treeDataType) => {
    setDataSourceLeft({ treeData });
  };

  const [
    readOnlyTreeDataSource,
    setReadOnlyTreeDataSource,
  ] = useState<treeDataType>({
    treeData: [],
  }); // 保存左侧树的数据源，用于只读，搜索
  const handleReadOnlyTreeDataSourceChange = ({ treeData }: treeDataType) => {
    setReadOnlyTreeDataSource({ treeData });
  };

  // 右边的树形选择框
  const [checkListRight, setCheckListRight] = useState<string[]>([]); // 存储在右侧选择框中的key
  const handleCheckListRightChange = (value: string[]) => {
    setCheckListRight(value);
  };

  const [dataSourceRight, setDataSourceRight] = useState<treeDataType>({
    treeData: [],
  }); // 右侧树形选择框的数据源
  const handleDataSourceRightChange = ({ treeData }: treeDataType) => {
    setDataSourceRight({ treeData });
  };

  const [readOnlyAllKeyRight, setReadOnlyAllKeyRight] = useState<string[]>([]); // 右侧所有的key
  const handleReadOnlyAllKeyRightChange = (arr: string[]) => {
    setReadOnlyAllKeyRight(arr);
  };

  const [isBrightRight, setIsBrightRight] = useState<boolean>(false); // 控制右侧按钮是否高亮
  const handleIsBrightRightChange = (isBright: boolean) => {
    setIsBrightRight(isBright);
  };

  const [
    readOnlyDataSourceRight,
    setReadOnlyDataSourceRight,
  ] = useState<treeDataType>({
    treeData: [],
  }); // 右侧只读的树形数据，主要用于搜索
  const handleReadOnlyDataSourceRightChange = ({ treeData }: treeDataType) => {
    setReadOnlyDataSourceRight({ treeData });
  };

  return {
    finallyValue,
    checkListLeft,
    checkListRight,
    dataSourceRight,
    dataSourceLeft,
    defaultValue,
    flatArray,
    sonParMap,
    isBrightLeft,
    isBrightRight,
    indeterminateLeft,
    readOnlyAllKeyRight,
    readOnlyDataSourceRight,
    readOnlyAllKeyLeft,
    readOnlyTreeDataSource,
    handleFinallyValueChange,
    handleCheckListLeftChange,
    handleCheckListRightChange,
    handleDataSourceRightChange,
    handleDataSourceLeftChange,
    handleFlatArrayChange,
    handleSonParMapChange,
    handleReadOnlyAllKeyRightChange,
    handleReadOnlyDataSourceRightChange,
    handleIsBrightLeftChange,
    handleIsBrightRightChange,
    handleIndeterminateLeftChange,
    handleDefaultValueChange,
    handleReadOnlyAllKeyLeftChange,
    handleReadOnlyTreeDataSourceChange,
  };
}

export default useTreeShuttle;
