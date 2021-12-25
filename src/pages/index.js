import * as React from "react";
import Layout from "../components/Layout";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "gatsby-theme-material-ui";
import { navigate } from "gatsby";

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
            <Typography variant="h1" component="h1">
              Album Cards
            </Typography>
            <Typography variant="h5" component="h5">
              Print out a physical version of a digital album to put in your collection. Scan and play.
            </Typography>
            <Button onClick={() => navigate("/app")} size="large" variant="contained">
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
