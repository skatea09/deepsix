import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import PropTypes from "prop-types";

const propTypes = {
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  updateName: PropTypes.func.isRequired
};

const defaultProps = {
  name: "New"
};

class NodeName extends Component {
  state = { input: "", isEditing: false, hovering: false };

  focus() {
    this.textInput.focus();
  }

  updateName = () => {
    const { isEditing, input } = this.state;
    const { name, id, updateName } = this.props;
    this.setState({ isEditing: !isEditing });
    if (input && input !== name) updateName({ id, name: input });
  };

  componentDidUpdate() {
    const { isEditing } = this.state;
    if (isEditing) this.focus();
  }

  render() {
    const { id, name } = this.props;
    const { isEditing, hovering } = this.state;
    return (
      <div
        className="flex relative"
        onMouseEnter={() => this.setState({ hovering: !hovering })}
        onMouseLeave={() => this.setState({ hovering: !hovering })}
      >
        {isEditing ? (
          <input
            className="outline-none border rounded-sm mb-1"
            onBlur={this.updateName}
            onChange={e => this.setState({ input: e.target.value })}
            ref={input => {
              this.textInput = input;
            }}
          />
        ) : (
          <Link
            to={`/${id}`}
            className="no-underline text-black hover:underline"
          >
            {name}
          </Link>
        )}
        {hovering &&
          !isEditing && (
            <i
              className="fas fa-pencil-alt pin-r pl-1 cursor-pointer text-sm text-black px-2"
              onClick={() => this.setState({ isEditing: !isEditing })}
            />
          )}
      </div>
    );
  }
}

NodeName.propTypes = propTypes;
NodeName.defaultProps = defaultProps;

export default connect(
  null,
  actions
)(NodeName);
