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
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "1efb2129cbfb49118c67c1e4f2e3625b"}'
        />
      </Helmet>
      {children}
    </>
  );
};

export default Layout;
