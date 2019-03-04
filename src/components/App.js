import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import store from "../redux/store";
import Tree from "./Tree";

const App = () => (
  <Provider store={store}>
    <Switch>
      <Route exact path='/' component={Tree} />
      <Route path='/:nodeId' component={Tree} />
    </Switch>
  </Provider>
);

export default App;
