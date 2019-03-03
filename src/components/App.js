import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import store from "../redux/store";
import TreeRoot from "./TreeRoot";

const App = () => (
  <Provider store={store}>
    <Switch>
      <Route exact path='/' component={TreeRoot} />
      <Route path='/:nodeId' component={TreeRoot} />
    </Switch>
  </Provider>
);

export default App;
