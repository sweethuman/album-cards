import { Router } from "@reach/router";
import Layout from "../../components/Layout";
import Default from "../../client-only/app/Default";
import * as React from "react";
import Print from "../../client-only/app/Print";

const App = () => {
  return (
    <Layout>
      <Router basepath="/app">
        <Default path="/" />
        <Print path="/print" />
      </Router>
    </Layout>
  );
};

export default App;
