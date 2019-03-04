import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import NodeName from "./NodeName";

const TreeNode = ({
  node,
  dataObj,
  addNode,
  deleteNode,
  canDelete,
  isPageRoot,
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

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this node?")) {
      deleteNodes(node);
      history.push("/");
    }
  };

  const DeleteButton = () =>
    canDelete && (
      <i
        className="fa fa-minus-circle cursor-pointer self-center absolute"
        style={{ left: -24 }}
        onClick={handleDelete}
      />
    );

  const AddButton = () => (
    <i
      className="fa fa-plus-circle cursor-pointer pl-2 self-center"
      onClick={() => addNode(node.id)}
    />
  );

  const ChildNodes = () => {
    const childNodes = getChildNodes();
    if (!childNodes) return null;
    return (
      childNodes &&
      childNodes.map(node => (
        <TreeNode
          node={node}
          dataObj={dataObj}
          addNode={addNode}
          deleteNode={deleteNode}
          key={node.id}
          history={history}
        />
      ))
    );
  };

  return (
    <li id={isPageRoot ? "tree-root" : null}>
      <div className="flex node-name">
        <DeleteButton />
        <NodeName name={node.name} id={node.id} />
        <AddButton />
      </div>
      <ul>
        <ChildNodes />
      </ul>
    </li>
  );
};

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  dataObj: PropTypes.object.isRequired,
  addNode: PropTypes.func.isRequired,
  deleteNode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isPageRoot: PropTypes.bool,
  canDelete: PropTypes.bool
};

TreeNode.defaultProps = {
  canDelete: false,
  isPageRoot: false
};

export default connect(
  null,
  actions
)(TreeNode);
