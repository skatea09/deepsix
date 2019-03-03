import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

const propTypes = {
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
};

const defaultProps = {
  name: "New"
};

class NodeName extends Component {
  state = { input: "", isEditiong: false };

  render() {
    const { id, name } = this.props;
    return (
      <Fragment>
        <Link to={`/${id}`}>{name}</Link>
        <div>Edit</div>
      </Fragment>
    );
  }
}

NodeName.propTypes = propTypes;
NodeName.defaultProps = defaultProps;

export default NodeName;
