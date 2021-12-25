import * as React from "react";
import Layout from "../components/Layout";
import { Box, Container, Typography } from "@mui/material";
import { Link, Button } from "gatsby-theme-material-ui";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage = () => {
  return (
    <Layout>
      <Container>
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "5rem",
            textAlign: "center",
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
            }}>
            <StaticImage
              src="../images/logo_transparent.png"
              alt="Logo"
              layout="constrained"
              height={400}
              loading="eager"
              placeholder="tracedSVG"
              formats={["png"]}
              trim
            />
            <Typography variant="h5" component="h5">
              Print out a physical version of a digital album to put in your collection. Scan and play.
            </Typography>
            <Button to="/app" size="large" variant="contained">
              Go to App
            </Button>
          </Box>
          <Box>
            <Typography variant="subtitle1" component="p">
              By <Link to="https://sweethuman.tech">sweethuman</Link>
            </Typography>
            <Typography variant="subtitle2" component="p">
              Source code: <Link to="https://github.com/sweethuman/album-cards">Github</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default IndexPage;
