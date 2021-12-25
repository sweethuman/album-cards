import { Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import * as React from "react";
import { Album } from "../types/searchResponse";
import { Button } from "gatsby-theme-material-ui";
import { navigate } from "gatsby";

type Props = {
  album: Album;
};

const AlbumSelector: React.FC<Props> = ({ album }) => {
  return (
    <Card sx={{ display: "flex", flexDirection: "row" }}>
      <CardMedia
        image={album.image}
        alt="Live from space album cover"
        component="img"
        sx={{
          width: {
            xs: 75,
            md: 151,
          },
        }}
      />
      <Stack>
        <CardContent>
          <Typography component="div" variant="h5">
            {album.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {album.artists.map((artist) => artist.name).join(", ")}
          </Typography>
        </CardContent>
        <CardActions sx={{ ml: "8px" }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() =>
              navigate("/app/print", {
                state: { sourceUrl: album.sourceUrl },
              })
            }>
            Select
          </Button>
        </CardActions>
      </Stack>
    </Card>
  );
};

export default AlbumSelector;
