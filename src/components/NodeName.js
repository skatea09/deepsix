import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import PropTypes from "prop-types";

class NodeName extends Component {
  state = { input: "", isEditing: false, hovering: false };

  focus() {
    this.textInput.focus();
  }

  blur() {
    this.textInput.blur();
  }

  updateName = () => {
    const { isEditing, input } = this.state;
    const { name, id, updateName } = this.props;
    this.setState({ isEditing: !isEditing });
    if (input && input !== name) updateName({ id, name: input });
  };

  Input = () => (
    <input
      className="outline-none border rounded-sm mb-1 pl-2"
      onBlur={this.updateName}
      onChange={e => this.setState({ input: e.target.value })}
      onKeyPress={e => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.blur();
        }
      }}
      ref={input => {
        this.textInput = input;
      }}
    />
  );

  Name = () => {
    const { name, id } = this.props;
    return (
      <Link to={`/${id}`} className="no-underline text-black hover:underline">
        {name}
      </Link>
    );
  };

  Pencil = () => {
    const { isEditing } = this.state;
    return (
      <i
        className="fas fa-pencil-alt pin-r pl-1 cursor-pointer text-sm text-black px-2"
        onClick={() => this.setState({ isEditing: !isEditing })}
      />
    );
  };

  componentDidUpdate() {
    const { isEditing } = this.state;
    if (isEditing) this.focus();
  }

  render() {
    const { isEditing, hovering } = this.state;
    const { Input, Name, Pencil } = this;
    return (
      <div
        className="flex relative"
        onMouseEnter={() => this.setState({ hovering: !hovering })}
        onMouseLeave={() => this.setState({ hovering: !hovering })}
      >
        {isEditing ? <Input /> : <Name />}
        {hovering && !isEditing && <Pencil />}
      </div>
    );
  }
}

NodeName.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  updateName: PropTypes.func.isRequired
};

NodeName.defaultProps = {
  name: "New"
};

export default connect(
  null,
  actions
)(NodeName);
