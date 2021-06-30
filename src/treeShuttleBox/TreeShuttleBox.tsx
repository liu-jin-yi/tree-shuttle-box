import React, { ReactNode, FC, useEffect } from "react";
import { TreeShuttleContainer } from "./styled";

import {
  TreeShuttleBoxLeft,
  TreeShuttleBoxRight,
  TreeShuttleButton,
  TreeShuttleBoxRightPropsType,
  shuttleLeftProps,
} from "./index";
import { TreeProvider } from "./useTreeContext";
import { treeDataType } from "./interfaceType";
import useTreeShuttle from "./useTreeShuttle";

interface TreeShuttleBoxType {
  ({
    children,
    defaultValue,
    handleChange,
    isOnlyLeft,
  }: {
    children: ReactNode;
    defaultValue?: Array<string>;
    handleChange?: (value: string[]) => void;
    isOnlyLeft?: boolean;
  }): JSX.Element;
  TreeShuttleBoxLeft: FC<shuttleLeftProps & treeDataType>;
  TreeShuttleBoxRight: FC<TreeShuttleBoxRightPropsType>;
  TreeShuttleButton: FC;
}

const TreeShuttleBox: TreeShuttleBoxType = ({
  children,
  defaultValue = [],
  handleChange,
  isOnlyLeft = false, // 主要控制是否是需要左侧树形选择框
}) => {
  const {
    finallyValue,
    handleDefaultValueChange,
    handleCheckListLeftChange,
    handleIsBrightRightChange,
    ...rest
  } = useTreeShuttle();
  useEffect(() => {
    if (defaultValue.length) {
      // 有默认数据时
      // 保存默认数据
      handleDefaultValueChange(defaultValue);
      // 保存左侧选中的数据
      handleCheckListLeftChange(defaultValue);
      // to Right 高亮
      handleIsBrightRightChange(true);
    }
  }, [defaultValue]);
  useEffect(() => {
    handleChange && handleChange(finallyValue);
  }, [finallyValue]);
  return (
    <TreeProvider
      value={{
        finallyValue,
        handleDefaultValueChange,
        handleCheckListLeftChange,
        handleIsBrightRightChange,
        ...rest,
      }}
    >
      <TreeShuttleContainer isOnlyLeft={isOnlyLeft}>
        {children}
      </TreeShuttleContainer>
    </TreeProvider>
  );
};
TreeShuttleBox.TreeShuttleBoxLeft = TreeShuttleBoxLeft;
TreeShuttleBox.TreeShuttleBoxRight = TreeShuttleBoxRight;
TreeShuttleBox.TreeShuttleButton = TreeShuttleButton;

export default TreeShuttleBox;
