import * as React from "react";
import ToPrint from "./ToPrint";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  InputAdornment,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import FastAverageColor from "fast-average-color";
import QrCodeWithLogo from "qrcode-with-logos";
import { contrastColor } from "contrast-color";
import { AlbumData } from "../types/createResponse";
import { LoadingButton } from "@mui/lab";

type Props = {
  album: AlbumData;
};

const PrintPreview: React.FC<Props> = ({ album }) => {
  const [processing, setProcessing] = useState(false);
  const [showArtist, setShowArtist] = useState(true);
  const [useAlbumTheme, setUseAlbumTheme] = useState(true);
  const [dataUrl, setDataUrl] = useState("");
  const [albumArtUrl, setAlbumArtUrl] = useState(album.image);
  const [dimension, setDimension] = useState("20");
  const imageRef = useRef<HTMLImageElement>(null);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    let cancel = false;

    async function calculateQrCode() {
      setProcessing(true);
      if (!imageRef) return;
      const fac = new FastAverageColor();
      let color = await fac.getColorAsync(imageRef.current, { algorithm: "simple" });
      let contrast = contrastColor({ bgColor: color.hex });
      let result = await new QrCodeWithLogo({
        content: `https://songwhip.com/${album.url}`,
        width: 3000,
        logo: !showArtist
          ? undefined
          : {
              src: album.artists[0].image,
              bgColor: !useAlbumTheme ? undefined : color.hex,
              logoRadius: 360,
            },
        nodeQrCodeOptions: !useAlbumTheme
          ? undefined
          : {
              color: {
                dark: contrast,
                light: color.hex,
              },
            },
      }).getCanvas();
      if (cancel) return;
      setDataUrl(result.toDataURL("image/webp", 1));
      setProcessing(false);
    }

    calculateQrCode();

    return () => {
      cancel = true;
    };
  }, [imageRef, showArtist, useAlbumTheme]);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "2rem",
        my: "2rem",
      }}>
      <Typography variant="h2" component="h2">
        Preview
      </Typography>
      <ToPrint dimension={`${dimension}cm`} qrCodeUrl={dataUrl} albumArtUrl={albumArtUrl} ref={componentRef} />
      <Box sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", gap: "0.5rem" }}>
        <Card sx={{ flex: 1 }}>
          <CardMedia image={dataUrl} alt="QRCode Preview" component="img" />
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardMedia src={albumArtUrl} ref={imageRef} alt="album art" crossOrigin="anonymous" component="img" />
        </Card>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: "1rem",
        }}>
        <Typography variant="h5" component="p">
          Print this to the desired size, cut, stick both sides to a surface or to a each other and put it in your
          collection.
        </Typography>
        <LoadingButton
          onClick={() => handlePrint()}
          size="large"
          loading={processing}
          loadingPosition="end"
          variant="contained">
          Print this out!
        </LoadingButton>
      </Box>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            Settings
          </Typography>
          <TextField
            label="Print Dimensions"
            id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: <InputAdornment position="start">cm</InputAdornment>,
            }}
            value={dimension}
            onChange={(e) => setDimension(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "0.5rem", ml: "14px" }}>
            <Typography variant="button" component="div">
              Show Artist
            </Typography>
            <Switch
              checked={showArtist}
              onChange={(e) => setShowArtist(e.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "0.5rem", ml: "14px" }}>
            <Typography variant="button" component="div">
              Use Album Theme
            </Typography>
            <Switch
              checked={useAlbumTheme}
              onChange={(e) => setUseAlbumTheme(e.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PrintPreview;
