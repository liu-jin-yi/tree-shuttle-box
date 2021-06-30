import {
  FunEntryType,
  FlatEntryType,
  reorganizeEntryType,
} from "./interfaceType";
export const traverseTreeData = ({
  treeData = [],
  callback = () => {},
  parentId = null,
  replaceName = "children",
}: FunEntryType) => {
  // 遍历树形数据
  treeData.forEach((item: any, index) => {
    callback(item, index, parentId);
    if (item[replaceName] && item[replaceName].length > 0) {
      traverseTreeData({
        treeData: item[replaceName],
        callback,
        parentId: item.key,
        replaceName,
      });
    }
  });
};

export const flatTree = ({
  treeData = [],
  callback = () => {},
  replaceName = "children",
}: FlatEntryType) => {
  // 扁平化树形数据结构
  let flatArr: any[] = [];
  treeData.forEach((item, index) => {
    const copyItem = { ...item };
    if (item[replaceName]) {
      delete copyItem[replaceName];
    }
    callback(copyItem, index);
    flatArr.push(copyItem);
    if (item[replaceName] && item[replaceName].length > 0) {
      flatArr = flatArr.concat(
        flatTree({ treeData: item[replaceName], replaceName, callback })
      );
    }
  });
  return flatArr;
};

export const searchTree = (searchValue = "", treeArr: any[] = []) => {
  // 树形数据搜索
  let searTreeArr: any[] = [];
  treeArr?.forEach((treeItem: { title: string; children: any[] }) => {
    if (treeItem.title.includes(searchValue)) {
      searTreeArr.push(treeItem);
    } else {
      if (treeItem.children && treeItem.children.length) {
        const chr = searchTree(searchValue, treeItem.children);
        const obj = {
          ...treeItem,
          children: chr,
        };
        if (chr && chr.length) {
          searTreeArr.push(obj);
        }
      }
    }
  });
  return searTreeArr;
};

export const reorganizeTree = ({
  treeArr = [],
  id = null,
  link = "parentId",
  idName = "key",
}: reorganizeEntryType): any[] =>
  // 重组树形数据
  treeArr
    .filter((itemF) => itemF[link] === id)
    .map((itemM) => ({
      ...itemM,
      children: reorganizeTree({
        treeArr,
        id: itemM[idName],
        link,
        idName,
      }),
    }));

export const searchAllParents = (
  arr: string[],
  sonParMap: Map<string, string | null>
): string[] => {
  let allKey: string[] = [];
  function search(key: string) {
    allKey.push(key);
    const nextKey = sonParMap.get(key);
    if (nextKey) {
      search(nextKey);
    }
  }
  arr.forEach((key) => {
    search(key);
  });
  return Array.from(new Set(allKey));
};
