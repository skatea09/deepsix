import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  node: PropTypes.object.isRequired,
  dataObj: PropTypes.object.isRequired
};

const TreeNode = ({ node, dataObj }) => {
  let childNodes;
  if (node.children) childNodes = node.children.map(id => dataObj[id]);
  return (
    <div style={{ marginLeft: 40 }}>
      <div>{node.name}</div>
      {childNodes &&
        childNodes.map(node => <TreeNode node={node} dataObj={dataObj} />)}
    </div>
  );
};

TreeNode.propTypes = propTypes;

export default TreeNode;
