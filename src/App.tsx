import React, { useState, useEffect, useCallback } from "react";
import TreeShuttleBox from "./treeShuttleBox/TreeShuttleBox";
import treeData_ from "./mock/big-tree.json";

function App() {
  const [treeData, settreeData] = useState<any[]>([]);
  const [defaultArr, setdefaultArr] = useState<any[]>([]);
  useEffect(() => {
    settreeData(treeData_);
    let defaultArr = [
      "9745585390301",
      "8908033790301",
      "2551253780501",
      "3014087750601",
      "6093241980901",
      "6624581220001",
      "7209552490101",
      "9867334920901",
    ];
    setdefaultArr(defaultArr);
  }, []);
  const handleChange = useCallback((finallyValue: string[]) => {
    console.log("handleChange -> finallyValue", finallyValue);
  }, []);

  return (
    <div>
      <h1>树形穿梭框</h1>
      <TreeShuttleBox defaultValue={defaultArr} handleChange={handleChange}>
        <TreeShuttleBox.TreeShuttleBoxLeft treeData={treeData} />
        <TreeShuttleBox.TreeShuttleButton />
        <TreeShuttleBox.TreeShuttleBoxRight />
      </TreeShuttleBox>
      <h1> 左侧树形选择框 </h1>
      <TreeShuttleBox isOnlyLeft defaultValue={defaultArr}>
        <TreeShuttleBox.TreeShuttleBoxLeft
          treeData={treeData}
          handleChange={handleChange}
        />
      </TreeShuttleBox>
    </div>
  );
}

export default App;
