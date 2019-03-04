import React, { Component } from "react";
import _keyBy from "lodash/keyBy";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
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

  getRoots = () => {
    const {
      nodes,
      location: { pathname }
    } = this.props;
    const nodesObj = _keyBy(nodes, "id");
    let pageRoot;
    const mainRoot = nodes.find(node => node.isRoot);
    if (pathname === "/") pageRoot = mainRoot;
    else pageRoot = nodesObj[pathname.substring(1)];
    return { pageRoot, mainRoot, nodesObj };
  };

  renderNotFound = () => {
    const { location: { pathname } } = this.props;
    return <div>{`No match found for ${pathname.substring(1)}`}</div>;
  };

  render() {
    const { nodes, history } = this.props;
    if (!nodes.length) return null;
    const { pageRoot, mainRoot, nodesObj } = this.getRoots();
    if (!pageRoot) return this.renderNotFound();
    return (
      <div>
        <TreeNode
          node={pageRoot}
          dataObj={nodesObj}
          canDelete={pageRoot !== mainRoot}
          history={history}
        />
      </div>
    );
  }
}

TreeRoot.propTypes = propTypes;

export default compose(
  withRouter,
  connect(
    state => ({
      nodes: state.data
    }),
    { setupDbListener }
  )
)(TreeRoot);
