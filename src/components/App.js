import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setupDbListener } from '../redux/actions';
import TreeRoot from './TreeRoot';

const propTypes = {
  setupDbListener: PropTypes.func.isRequired,
}

class App extends Component {
  componentDidMount() {
    this.props.setupDbListener();
  }
  render() {
    return (
      <TreeRoot />
    );
  }
}

App.propTypes = propTypes;

export default connect(null, { setupDbListener })(App);
