import React, { Component } from "react";
import _keyBy from "lodash/keyBy";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setupDbListener } from "../redux/actions";
import TreeNode from "./TreeNode";

const propTypes = {
  nodes: PropTypes.array.isRequired,
  setupDbListener: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

class TreeRoot extends Component {
  componentDidMount() {
    this.props.setupDbListener();
  }
  render() {
    const { nodes, location, history } = this.props;
    if (!nodes.length) return null;
    const dataObj = _keyBy(nodes, "id");
    let pageRoot;
    const mainRoot = nodes.find(node => node.isRoot);
    if (location.pathname === "/") pageRoot = mainRoot;
    else pageRoot = dataObj[location.pathname.substring(1)];
    if (!pageRoot) return <div>{`No match found for ${location.pathname}`}</div>;
    return (
      <div>
        <TreeNode
          node={pageRoot}
          dataObj={dataObj}
          canDelete={pageRoot !== mainRoot}
          history={history}
        />
      </div>
    );
  }
}

TreeRoot.propTypes = propTypes;

export default connect(
  state => ({
    nodes: state.data
  }),
  { setupDbListener }
)(TreeRoot);
