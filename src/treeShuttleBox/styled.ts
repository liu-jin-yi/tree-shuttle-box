import styled from "styled-components";

export const TreeShuttleContainer = styled.div`
  width: ${({ isOnlyLeft }: { isOnlyLeft: boolean }) =>
    isOnlyLeft ? 360 : 792}px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CustomTransferBox = styled.div`
  width: 358px;
  height: 398px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 5px;
`;
export const CustomTransferButtonBox = styled.div`
  width: 24px;
  margin: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .active {
    background: #ffaa00;
    border: 1px solid #ffaa00;
  }
  .icon-color {
    color: rgba(0, 0, 0, 0.25);
  }
  .icon-color-active {
    color: #ffffff;
  }
`;

export const CustomTransferButton = styled.div`
  width: 23px;
  height: 23px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & + & {
    margin-top: 12px;
  }
`;

export const CustomTransferHead = styled.div`
  height: 39px;
  border-bottom: 1px solid #dddddd;
  padding: 13px 0 12px 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 14px;
  .select-count {
    font-size: 12px;
    font-family: Helvetica, Helvetica-Regular;
    font-weight: 400;
    text-align: left;
    color: #555555;
    padding: 0;
    margin: 0 0 0 8px;
  }
`;

export const CustomTransferBody = styled.div`
  padding: 8px;
`;

export const CustomTransferTree = styled.div`
  height: 300px;
  overflow: auto;
  margin-top: 6px;

  /* 最多显示两行，超过就隐藏 */
  .ant-tree-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
`;
