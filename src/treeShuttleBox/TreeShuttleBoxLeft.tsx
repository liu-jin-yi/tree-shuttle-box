import React, { FC, useMemo, useState, useEffect } from "react";
import {
  CustomTransferBox,
  CustomTransferHead,
  CustomTransferBody,
  CustomTransferTree,
} from "./styled";
import { Checkbox, Input, Tree } from "antd";
const { Search } = Input;
import { treeDataType } from "./interfaceType";
import { traverseTreeData, flatTree, searchTree } from "./tool";
import { useTreeContext } from "./useTreeContext";
export interface shuttleLeftProps {
  handleChange?: (value: string[]) => void;
}

const TreeShuttleBoxLeft: FC<shuttleLeftProps & treeDataType> = ({
  treeData,
  handleChange, // 当只需要左侧选择框时就可以传递此回调函数，获取所选择的值
}) => {
  const {
    checkListLeft,
    handleCheckListLeftChange,
    dataSourceLeft,
    handleDataSourceLeftChange,
    handleFlatArrayChange,
    handleSonParMapChange,
    finallyValue,
    handleIsBrightRightChange,
    indeterminateLeft,
    handleIndeterminateLeftChange,
    readOnlyAllKeyLeft,
    handleReadOnlyAllKeyLeftChange,
    readOnlyTreeDataSource,
    handleReadOnlyTreeDataSourceChange,
  } = useTreeContext();
  const [checkAll, setCheckAll] = useState<boolean>(false); // 控制全选
  const [searchText, setSearchText] = useState<string>(""); // 用于搜索title

  useEffect(() => {
    // 遍历树形数据设置parentId
    const sonParMap: Map<string, string | null> = new Map();
    traverseTreeData({
      treeData,
      callback(item, index, parentId) {
        item.parentId = parentId;
        sonParMap.set(item.key, item.parentId);
      },
    });
    handleSonParMapChange(sonParMap);
    // 将所以树形数据拉平，为后续组装右侧的树形树形使用
    const flatArray = flatTree({
      treeData: JSON.parse(JSON.stringify(treeData)),
    });
    handleFlatArrayChange(flatArray);
    // 得到左侧所有的key，主要用于全选
    const allKey: string[] = flatArray.map(({ key }) => key);
    // 保存左侧数据源所有的key
    handleReadOnlyAllKeyLeftChange(allKey);
    // 保存到左侧的数据源
    handleDataSourceLeftChange({
      treeData: JSON.parse(JSON.stringify(treeData)),
    });
    // 保存左侧树的数据源，只读，用于搜索
    handleReadOnlyTreeDataSourceChange({
      treeData: JSON.parse(JSON.stringify(treeData)),
    });
  }, [treeData]);
  useEffect(() => {
    // 左侧选择数据时回调change
    handleChange && handleChange(checkListLeft);
  }, [checkListLeft]);
  useEffect(() => {
    if (checkListLeft.length !== readOnlyAllKeyLeft.length) {
      setCheckAll(false);
    }
  }, [checkListLeft, readOnlyAllKeyLeft]);
  const [handleCheckBoxChange, handleSelectNode] = useMemo(() => {
    const handleCheckBoxChange = (e: any) => {
      // 处理全选和半选
      handleCheckListLeftChange(e.target.checked ? readOnlyAllKeyLeft : []);
      // 处理全选状态
      setCheckAll(e.target.checked);
      // 处理半选状态
      handleIndeterminateLeftChange(false);
      // 处理to Right 高亮
      handleIsBrightRightChange(e.target.checked);
    };
    const handleSelectNode = (keyArr: any) => {
      // 处理左侧选中的key
      handleCheckListLeftChange(keyArr);
      // 处理全选状态
      setCheckAll(readOnlyAllKeyLeft.length === keyArr.length);
      // 处理半选状态
      handleIndeterminateLeftChange(
        keyArr.length && readOnlyAllKeyLeft.length !== keyArr.length
      );
      // 处理 to Right 高亮
      handleIsBrightRightChange(!!keyArr.length);
    };
    return [handleCheckBoxChange, handleSelectNode];
  }, [readOnlyAllKeyLeft, checkAll, checkListLeft]);

  const [handleSearchTree, handleSearchChange] = useMemo(() => {
    const handleSearchTree = (value: string) => {
      if (value === "") {
        // 点击清除搜索或者手动删除文字按下回车
        const treeData = JSON.parse(
          JSON.stringify(readOnlyTreeDataSource.treeData)
        );
        // 处理左侧数据源选中数据的禁用
        traverseTreeData({
          treeData,
          callback(item) {
            item["disabled"] = finallyValue.includes(item.key);
          },
        });
        // 保存左侧的数据源
        handleDataSourceLeftChange({
          treeData,
        });
      } else {
        // 搜索树
        handleDataSourceLeftChange({
          treeData: searchTree(value, dataSourceLeft.treeData),
        });
      }
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value.trim());
    };
    return [handleSearchTree, handleSearchChange];
  }, [
    searchText,
    readOnlyTreeDataSource.treeData,
    dataSourceLeft.treeData,
    finallyValue,
  ]);

  return (
    <CustomTransferBox>
      <CustomTransferHead>
        {useMemo(
          () => (
            <Checkbox
              indeterminate={indeterminateLeft}
              checked={checkAll}
              onChange={handleCheckBoxChange}
            />
          ),
          [indeterminateLeft, checkAll, readOnlyAllKeyLeft]
        )}

        {useMemo(
          () => (
            <p className="select-count">
              {checkListLeft.length}/{readOnlyAllKeyLeft.length}items
            </p>
          ),
          [checkListLeft, readOnlyAllKeyLeft]
        )}
      </CustomTransferHead>
      <CustomTransferBody>
        <Search
          placeholder="search here"
          value={searchText}
          onSearch={handleSearchTree}
          onChange={handleSearchChange}
          allowClear
          enterButton
        />
        <CustomTransferTree className="homeScrollBar">
          <Tree
            height={300}
            selectable={false}
            checkable
            checkedKeys={checkListLeft}
            onCheck={handleSelectNode}
            treeData={dataSourceLeft.treeData}
          />
        </CustomTransferTree>
      </CustomTransferBody>
    </CustomTransferBox>
  );
};

export { TreeShuttleBoxLeft };
