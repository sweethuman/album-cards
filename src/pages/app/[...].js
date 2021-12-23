import { Router } from "@reach/router";
import Layout from "../../components/Layout";
import Default from "../../client-only/app/Default";

const App = () => {
  return (
    <Layout>
      <Router basepath="/app">
        <Default path="/" />
      </Router>
    </Layout>
  );
};

export default App;
