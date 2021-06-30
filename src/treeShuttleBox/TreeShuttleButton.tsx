import React, { FC, useMemo, useEffect } from "react";
import { CustomTransferButtonBox, CustomTransferButton } from "./styled";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { useTreeContext } from "./useTreeContext";
import { searchAllParents, reorganizeTree, traverseTreeData } from "./tool";
const TreeShuttleButton: FC = () => {
  const {
    checkListLeft,
    checkListRight,
    flatArray,
    sonParMap,
    dataSourceLeft,
    finallyValue,
    handleDataSourceRightChange,
    handleReadOnlyAllKeyRightChange,
    handleFinallyValueChange,
    handleDataSourceLeftChange,
    handleReadOnlyDataSourceRightChange,
    isBrightRight,
    handleIsBrightRightChange,
    isBrightLeft,
    handleIsBrightLeftChange,
    handleCheckListRightChange,
    handleCheckListLeftChange,
    indeterminateLeft,
    handleIndeterminateLeftChange,
    defaultValue,
    readOnlyAllKeyLeft,
    readOnlyAllKeyRight,
    readOnlyTreeDataSource,
    readOnlyDataSourceRight,
  } = useTreeContext();
  const [handleClickToRight, handleClickToLeft] = useMemo(() => {
    const handleClickToRight = () => {
      if (checkListLeft.length === 0 && !isBrightRight) {
        return;
      }
      // 取消左侧的半选
      handleIndeterminateLeftChange(false);
      if (readOnlyAllKeyLeft.length === checkListLeft.length) {
        // 左侧全选逻辑
        // 右侧数据源保存
        handleDataSourceRightChange(
          JSON.parse(JSON.stringify(readOnlyTreeDataSource))
        );
        // 保存右侧只读的数据源所有的key
        handleReadOnlyAllKeyRightChange([...checkListLeft]);
        // 保存最终值的key
        handleFinallyValueChange([...checkListLeft]);
        // 保存右侧只读的数据源用于搜索
        handleReadOnlyDataSourceRightChange({
          treeData: JSON.parse(JSON.stringify(checkListLeft)),
        });
        // 禁用左侧树已经选择的节点
        const treeData_ = JSON.parse(
          JSON.stringify(readOnlyTreeDataSource.treeData)
        );
        traverseTreeData({
          treeData: treeData_,
          callback(item) {
            item["disabled"] = true;
          },
        });
        handleDataSourceLeftChange({
          treeData: treeData_,
        });
      } else {
        // 左侧不全选逻辑
        // 得到子级的key 和 半选状态的 父级的key 用于重组数组
        let allKey = searchAllParents(checkListLeft, sonParMap);
        allKey = Array.from(new Set(allKey.concat(finallyValue)));
        // 得到选中的key 所对应的节点
        const selectNode = flatArray.filter(({ key }) => allKey.includes(key));
        // 重组树形数据结构
        const treeData = reorganizeTree({
          treeArr: selectNode,
        });
        // 右侧数据源保存
        handleDataSourceRightChange({ treeData });
        // 保存右侧只读的数据源所有的key
        handleReadOnlyAllKeyRightChange(allKey);
        // 保存最终值的key
        handleFinallyValueChange(allKey);
        // 保存右侧只读的数据源用于搜索
        handleReadOnlyDataSourceRightChange({
          treeData: JSON.parse(JSON.stringify(treeData)),
        });
        // 禁用左侧树已经选择的节点
        traverseTreeData({
          treeData: dataSourceLeft.treeData,
          callback(item) {
            item["disabled"] = allKey.includes(item.key);
          },
        });
        handleDataSourceLeftChange({
          treeData: [...dataSourceLeft.treeData],
        });
      }
      // 右侧按钮取消高亮
      handleIsBrightRightChange(false);
    };
    const handleClickToLeft = () => {
      if (checkListRight.length === 0 && !isBrightLeft) {
        return;
      }

      if (checkListRight.length === readOnlyAllKeyRight.length) {
        // 右侧全选逻辑
        // 保存左侧选择的key
        handleCheckListLeftChange([]);
        // 保存右侧的数据源
        handleDataSourceRightChange({ treeData: [] });
        // 保存右侧所有的key
        handleReadOnlyAllKeyRightChange([]);
        // 更改最终的key值
        handleFinallyValueChange([]);
        // 更改右侧选中的key值
        handleCheckListRightChange([]);
        // 保存右侧只读的数据源
        handleReadOnlyDataSourceRightChange({
          treeData: [],
        });
        // 保存左侧的数据源
        handleDataSourceLeftChange(
          JSON.parse(JSON.stringify(readOnlyTreeDataSource))
        );
      } else {
        // 右侧不全选逻辑
        // 在最终值里删除右边勾选的key
        const finallyArr = finallyValue.filter(
          (key) => !checkListRight.includes(key)
        );
        // 筛选右侧的树形数据
        const selectNode = flatArray.filter(({ key }) =>
          finallyArr.includes(key)
        );
        // 重组右侧树形数据
        const treeData = reorganizeTree({
          treeArr: selectNode,
        });
        // 更新左侧选择的key
        const selectKeyLeft = checkListLeft.filter(
          (key) => !checkListRight.includes(key)
        );
        // 保存左侧选择的key
        handleCheckListLeftChange(selectKeyLeft);
        // 保存右侧的数据源
        handleDataSourceRightChange({ treeData });
        // 保存右侧所有的key
        handleReadOnlyAllKeyRightChange(finallyArr);
        // 更改最终的key值
        handleFinallyValueChange(finallyArr);
        // 更改右侧选中的key值
        handleCheckListRightChange([]);
        // 保存右侧只读的数据源
        handleReadOnlyDataSourceRightChange({
          treeData: JSON.parse(JSON.stringify(treeData)),
        });
        // 取消左侧树数据源的禁用
        traverseTreeData({
          treeData: dataSourceLeft.treeData,
          callback(item) {
            item["disabled"] = finallyArr.includes(item.key);
          },
        });
        // 保存左侧的数据源
        handleDataSourceLeftChange({
          treeData: JSON.parse(JSON.stringify(dataSourceLeft.treeData)),
        });
      }

      // 取消左侧高亮显示
      handleIsBrightLeftChange(false);
    };
    return [handleClickToRight, handleClickToLeft];
  }, [
    checkListLeft,
    checkListRight,
    flatArray,
    dataSourceLeft,
    finallyValue,
    sonParMap,
    indeterminateLeft,
    defaultValue,
    readOnlyAllKeyLeft,
    readOnlyAllKeyRight,
    readOnlyTreeDataSource,
    readOnlyDataSourceRight,
  ]);
  useEffect(() => {
    if (defaultValue.length) {
      handleClickToRight();
    }
  }, [defaultValue]);
  return (
    <CustomTransferButtonBox>
      {useMemo(
        () => (
          <CustomTransferButton
            className={isBrightRight ? "active" : ""}
            onClick={handleClickToRight}
          >
            <RightOutlined
              className={isBrightRight ? "icon-color-active" : "icon-color"}
            />
          </CustomTransferButton>
        ),
        [
          isBrightRight,
          checkListLeft,
          indeterminateLeft,
          defaultValue,
          readOnlyAllKeyLeft,
          readOnlyAllKeyRight,
          readOnlyTreeDataSource,
          readOnlyDataSourceRight,
        ]
      )}
      {useMemo(
        () => (
          <CustomTransferButton
            className={isBrightLeft ? "active" : ""}
            onClick={handleClickToLeft}
          >
            <LeftOutlined
              className={isBrightLeft ? "icon-color-active" : "icon-color"}
            />
          </CustomTransferButton>
        ),
        [
          isBrightLeft,
          checkListRight,
          indeterminateLeft,
          defaultValue,
          readOnlyAllKeyLeft,
          readOnlyAllKeyRight,
          readOnlyTreeDataSource,
          readOnlyDataSourceRight,
        ]
      )}
    </CustomTransferButtonBox>
  );
};

export { TreeShuttleButton };
