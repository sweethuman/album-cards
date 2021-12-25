import { Box, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import * as React from "react";
import { Album } from "../types/searchResponse";
import { Link } from "gatsby-theme-material-ui";

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
      <Box>
        <CardContent>
          <Typography component="div" variant="h5">
            {album.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {album.artists.map((artist) => artist.name).join(", ")}
          </Typography>
        </CardContent>
        <CardActions>
          <Link size="small" to={`/app/print`} state={{ sourceUrl: album.sourceUrl }}>
            Select
          </Link>
        </CardActions>
      </Box>
    </Card>
  );
};

export default AlbumSelector;
