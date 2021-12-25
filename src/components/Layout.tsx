import * as React from "react";
import { Helmet } from "react-helmet";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>Album Cards</title>
        <meta
          name="description"
          content="Print out a physical version of a digital album to put in your collection. Scan and play."
        />
      </Helmet>
      {children}
    </>
  );
};

export default Layout;
