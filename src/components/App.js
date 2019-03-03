import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setupRealtimeNodes } from '../redux/actions';
import TreeRoot from './TreeRoot';

const propTypes = {
  setupRealtimeNodes: PropTypes.func.isRequired,
}

class App extends Component {
  componentDidMount() {
    this.props.setupRealtimeNodes();
  }
  render() {
    return (
      <TreeRoot />
    );
  }
}

App.propTypes = propTypes;

export default connect(null, { setupRealtimeNodes })(App);
