import * as React from "react";
import { Card, CardActions, CardContent, CardMedia, Skeleton, Stack } from "@mui/material";

const LoadingAlbumSelector: React.FC = () => {
  return (
    <Card sx={{ display: "flex", flexDirection: "row" }}>
      <CardMedia
        component="div"
        sx={{
          width: {
            xs: 75,
            md: 151,
          },
        }}>
        <Skeleton variant="rectangular" height="100%" animation="wave" />
      </CardMedia>
      <Stack>
        <CardContent>
          <Skeleton variant="text" animation="wave" height={45} width="30ch" />
          <Skeleton variant="text" animation="wave" height={30} width="20ch" />
        </CardContent>
        <CardActions sx={{ ml: "8px" }}>
          <Skeleton variant="text" animation="wave" height={30} width="10ch" />
        </CardActions>
      </Stack>
    </Card>
  );
};

export default LoadingAlbumSelector;
