import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import NodeName from "./NodeName";

const propTypes = {
  node: PropTypes.object.isRequired,
  dataObj: PropTypes.object.isRequired,
  addNode: PropTypes.func.isRequired,
  deleteNode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  canDelete: PropTypes.bool
};

const defaultProps = {
  canDelete: false
};

const TreeNode = ({
  node,
  dataObj,
  addNode,
  deleteNode,
  canDelete,
  history
}) => {
  const deleteNodes = node => {
    if (node.children)
      node.children.forEach(id => {
        const node = dataObj[id];
        deleteNode({ node, batchDelete: true });
        if (node.children) deleteNodes(node);
      });
    deleteNode({ node });
  };

  const getChildNodes = () => {
    if (node.children) {
      return node.children.map(id => dataObj[id]).filter(node => node);
    }
  };
  const childNodes = getChildNodes();

  return (
    <div>
      <div className="flex">
        <NodeName name={node.name} id={node.id} />
        {canDelete && (
          <div
            className="pl-2"
            onClick={() => {
              deleteNodes(node);
              history.push("/");
            }}
          >
            {"(-)"}
          </div>
        )}
      </div>
      <div style={{ marginLeft: 32 }}>
        <div onClick={() => addNode(node.id)} style={{ paddingLeft: 10 }}>
          (+)
        </div>
        {childNodes &&
          childNodes.map(node => (
            <TreeNode
              node={node}
              dataObj={dataObj}
              addNode={addNode}
              deleteNode={deleteNode}
              key={node.id}
            />
          ))}
      </div>
    </div>
  );
};

TreeNode.propTypes = propTypes;
TreeNode.defaultProps = defaultProps;

export default connect(
  null,
  actions
)(TreeNode);
