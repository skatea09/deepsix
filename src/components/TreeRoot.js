import React from "react";
import _keyBy from 'lodash/keyBy';
import TreeNode from "./TreeNode";
import data from "./data";

const TreeRoot = () => {
  const rootNode = data.find(node => node.isRoot);
  const dataObj = _keyBy(data, 'id');
  return (
    <div>
      <TreeNode node={rootNode} dataObj={dataObj}/>
    </div>
  );
};

export default TreeRoot;
