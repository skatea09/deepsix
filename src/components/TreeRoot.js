import React, { Component } from "react";
import _keyBy from "lodash/keyBy";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setupDbListener } from '../redux/actions';
import TreeNode from "./TreeNode";

const propTypes = {
  nodes: PropTypes.array.isRequired,
  setupDbListener: PropTypes.func.isRequired,
};

class TreeRoot extends Component {
  componentDidMount() {
    this.props.setupDbListener();
  }
  render() {
    const { nodes, location } = this.props;
    if (!nodes.length) return null;
    const dataObj = _keyBy(nodes, "id");
    let pageRoot;
    if (location.pathname === "/") pageRoot = nodes.find(node => node.isRoot);
    else pageRoot = dataObj[location.pathname.substring(1)];
    if (!pageRoot) return <div>Error</div>;
    return (
      <div>
        <TreeNode node={pageRoot} dataObj={dataObj} />
      </div>
    );
  }
}

TreeRoot.propTypes = propTypes;

export default connect(state => ({
  nodes: state.data
}), { setupDbListener })(TreeRoot);
