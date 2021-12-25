import * as React from "react";
import { alpha, AppBar, Box, Container, InputBase, Stack, Theme, Toolbar, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { EmptySearchResponse, SearchResponse } from "../../types/searchResponse";
import axios from "axios";
import AlbumSelector from "../../components/AlbumSelector";
import LoadingAlbumSelector from "../../components/LoadingAlbumSelector";

const Offset = () => <Box sx={{ height: "2rem" }} />;

const Default: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SearchResponse>(EmptySearchResponse);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (search == "") return;
    const controller = new AbortController();
    let cancel = false;
    setLoading(true);

    async function startSearch() {
      try {
        let result = await axios.get("https://music.gheo.workers.dev/api/search", {
          params: {
            q: search,
            country: "US",
            limit: 10,
          },
          signal: controller.signal,
        });
        if (cancel) return;
        setData(result.data);
        setLoading(false);
      } catch (e) {
        if (axios.isCancel(e)) {
          return;
        }
        throw e;
      }
    }

    const timeoutId = setTimeout(startSearch, 1000);
    return () => {
      cancel = true;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [search]);
  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Box
            sx={{
              position: "relative",
              borderRadius: (theme: Theme) => theme.shape.borderRadius,
              backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.15),
              "&:hover": {
                backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.25),
              },
              marginRight: (theme: Theme) => theme.spacing(2),
              marginLeft: (theme: Theme) => ({ xs: 0, sm: theme.spacing(3) }),
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}>
            <Box
              sx={{
                padding: (theme: Theme) => theme.spacing(0, 2),
                height: "100%",
                position: "absolute",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Search />
            </Box>
            <InputBase
              sx={{
                color: "inherit",
                "& .MuiInputBase-input": {
                  padding: (theme: Theme) => theme.spacing(1, 1, 1, 0),
                  // vertical padding + font size from searchIcon
                  paddingLeft: (theme: Theme) => `calc(1em + ${theme.spacing(4)})`,
                  transition: (theme: Theme) => theme.transitions.create("width"),
                  width: {
                    xs: "100%",
                    md: "50ch",
                  },
                },
              }}
              inputProps={{ "aria-label": "search" }}
              placeholder="Search album..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Offset />
      <Container>
        <Stack spacing="2rem">
          {loading ? (
            [...Array(5).keys()].map((i) => <LoadingAlbumSelector key={i} />)
          ) : data.data.albums.length == 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                height: "100%",
              }}>
              <Typography variant="h5" component="h5">
                We have found no album matching your query. Search again.
              </Typography>
            </Box>
          ) : (
            data.data.albums.map((album) => <AlbumSelector album={album} key={album.sourceUrl} />)
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Default;
