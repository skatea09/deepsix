import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../redux/actions";

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
      node.children.map(id => {
        const node = dataObj[id];
        deleteNode(node);
        if (node.children) deleteNodes(node);
      });
      deleteNode(node);
  };
  let childNodes;
  if (node.children)
    childNodes = node.children.map(id => dataObj[id]).filter(node => node);
  return (
    <div style={{ marginLeft: 40 }}>
      <div style={{ display: "flex" }}>
        <Link to={`/${node.id}`}>{node.name}</Link>
        <div onClick={() => addNode(node.id)} style={{ paddingLeft: 10 }}>
          (+)
        </div>
        {canDelete && (
          <div
            onClick={() => {
              deleteNodes(node);
              history.push("/");
            }}
          >
            {"(-)"}
          </div>
        )}
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
  );
};

TreeNode.propTypes = propTypes;
TreeNode.defaultProps = defaultProps;

export default connect(
  null,
  actions
)(TreeNode);
