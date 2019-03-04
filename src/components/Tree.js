import React from "react";
import { Helmet } from "react-helmet";
import TreeRoot from './TreeRoot';

const Tree = () => (
  <div className="pl-4">
    <Helmet>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
        crossorigin="anonymous"
      />
    </Helmet>
    <header className="text-3xl font-bold py-4">Evolutionary Tree</header>
    <TreeRoot />
  </div>
);

export default Tree;
