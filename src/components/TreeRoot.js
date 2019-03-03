import React from "react";
import _keyBy from 'lodash/keyBy';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TreeNode from "./TreeNode";

const propTypes = {
  nodes: PropTypes.array.isRequired,
}

const TreeRoot = ({ nodes }) => {
  if (!nodes.length) return null;
  const rootNode = nodes.find(node => node.isRoot);
  const dataObj = _keyBy(nodes, 'id');
  return (
    <div>
      <TreeNode node={rootNode} dataObj={dataObj}/>
    </div>
  );
};

TreeRoot.propTypes = propTypes;

export default connect((state) => ({
  nodes: state.data,
}))(TreeRoot);
