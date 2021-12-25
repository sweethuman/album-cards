import * as React from "react";
import { alpha, AppBar, Box, Container, InputBase, Theme, Toolbar } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { EmptySearchResponse, SearchResponse } from "../../types/searchResponse";
import axios from "axios";
import AlbumSelector from "../../components/AlbumSelector";

const Offset = () => <Box sx={{ height: "2rem" }} />;

const Default: React.FC = () => {
  const [data, setData] = useState<SearchResponse>(EmptySearchResponse);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    let cancel = false;

    async function startSearch() {
      try {
        if (search == "") return;
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {data.data.albums.map((album) => (
            <AlbumSelector album={album} key={album.sourceUrl} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Default;
