import React from "react";
import { Helmet } from "react-helmet";
import TreeRoot from './TreeRoot';

const Tree = () => (
  <div>
    <Helmet>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
        crossorigin="anonymous"
      />
    </Helmet>
    <header>Evolutionary Tree</header>
    <TreeRoot />
  </div>
);

export default Tree;
