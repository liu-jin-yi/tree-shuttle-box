import React, { FC, useState, useMemo, useEffect } from "react";
import {
  CustomTransferBox,
  CustomTransferHead,
  CustomTransferBody,
  CustomTransferTree,
} from "./styled";
import { Checkbox, Input, Tree } from "antd";
const { Search } = Input;
import { useTreeContext } from "./useTreeContext";
import { searchTree } from "./tool";

export interface TreeShuttleBoxRightPropsType {}

const TreeShuttleBoxRight: FC<TreeShuttleBoxRightPropsType> = ({}) => {
  const {
    dataSourceRight,
    checkListRight,
    readOnlyAllKeyRight,
    handleCheckListRightChange,
    handleDataSourceRightChange,
    readOnlyDataSourceRight,
    handleIsBrightLeftChange,
  } = useTreeContext();
  const [indeterminate, setIndeterminate] = useState<boolean>(false); // 控制半选
  const [checkAll, setCheckAll] = useState<boolean>(false); // 控制全选
  const [searchText, setSearchText] = useState<string>(""); // 用于搜索title

  useEffect(() => {
    if (checkListRight.length === 0) {
      // 无选择数据是 全选置空
      setCheckAll(false);
      // 无选择数据是 半选选置空
      setIndeterminate(false);
    }
  }, [checkListRight]);
  const [handleCheckBoxChange, handleSelectNode] = useMemo(() => {
    const handleCheckBoxChange = (e: any) => {
      // 处理全选和半选
      handleCheckListRightChange(e.target.checked ? readOnlyAllKeyRight : []);
      // 设置全选状态
      setCheckAll(e.target.checked);
      // 设置半选状态
      setIndeterminate(false);
      // 设置to Left 按钮高亮
      handleIsBrightLeftChange(e.target.checked);
    };
    const handleSelectNode = (keyArr: any) => {
      // 设置右侧选项
      handleCheckListRightChange(keyArr);
      // 设置全选状态
      setCheckAll(
        keyArr.length && readOnlyAllKeyRight.length === keyArr.length
      );
      // 设置半选状态
      setIndeterminate(
        keyArr.length && readOnlyAllKeyRight.length !== keyArr.length
      );
      // 设置to Left 按钮高亮
      handleIsBrightLeftChange(!!keyArr.length);
    };

    return [handleCheckBoxChange, handleSelectNode];
  }, [checkAll, readOnlyAllKeyRight]);

  const [handleSearchTree, handleSearchChange] = useMemo(() => {
    const handleSearchTree = (value: string) => {
      if (value === "") {
        // 点击清除搜索或者手动删除文字按下回车
        const treeData = JSON.parse(JSON.stringify(readOnlyDataSourceRight));
        // 保存右侧数据源
        handleDataSourceRightChange(treeData);
      } else {
        // 搜索树
        handleDataSourceRightChange({
          treeData: searchTree(value, dataSourceRight.treeData),
        });
      }
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // 搜索树形结构数据
      setSearchText(e.target.value.trim());
    };
    return [handleSearchTree, handleSearchChange];
  }, [searchText, readOnlyDataSourceRight, dataSourceRight.treeData]);

  return (
    <CustomTransferBox>
      <CustomTransferHead>
        {useMemo(
          () => (
            <Checkbox
              indeterminate={indeterminate}
              checked={checkAll}
              onChange={handleCheckBoxChange}
            />
          ),
          [indeterminate, checkAll, readOnlyAllKeyRight]
        )}

        {useMemo(
          () => (
            <p className="select-count">
              {checkListRight.length}/{readOnlyAllKeyRight.length}items
            </p>
          ),
          [readOnlyAllKeyRight, checkListRight]
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
        <CustomTransferTree>
          <Tree
            height={300}
            selectable={false}
            checkable
            checkedKeys={checkListRight}
            onCheck={handleSelectNode}
            treeData={dataSourceRight.treeData}
          />
        </CustomTransferTree>
      </CustomTransferBody>
    </CustomTransferBox>
  );
};

export { TreeShuttleBoxRight };
