import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import * as actions from "../redux/actions";

const propTypes = {
  node: PropTypes.object.isRequired,
  dataObj: PropTypes.object.isRequired,
  addNode: PropTypes.func.isRequired
};

const TreeNode = ({ node, dataObj, addNode }) => {
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
      </div>
      {childNodes &&
        childNodes.map(node => (
          <TreeNode
            node={node}
            dataObj={dataObj}
            addNode={addNode}
            key={node.id}
          />
        ))}
    </div>
  );
};

TreeNode.propTypes = propTypes;

export default connect(
  null,
  actions
)(TreeNode);
