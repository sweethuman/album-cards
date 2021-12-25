import * as React from "react";
import ToPrint from "./ToPrint";
import { Button, Container, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import FastAverageColor from "fast-average-color";
import QrCodeWithLogo from "qrcode-with-logos";
import { contrastColor } from "contrast-color";
import { AlbumData } from "../types/createResponse";

type Props = {
  album: AlbumData;
};

const PrintPreview: React.FC<Props> = ({ album }) => {
  const [dataUrl, setDataUrl] = useState("");
  const [albumArtUrl, setAlbumArtUrl] = useState(album.image);
  const [dimension] = useState("20cm");
  const imageRef = useRef<HTMLImageElement>(null);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    let cancel = false;

    async function calculateQrCode() {
      if (!imageRef) return;
      const fac = new FastAverageColor();
      let color = await fac.getColorAsync(imageRef.current, { algorithm: "simple" });
      let contrast = contrastColor({ bgColor: color.hex });
      let result = await new QrCodeWithLogo({
        content: "some content",
        width: 3000,
        logo: {
          src: album.artists[0].image,
          bgColor: color.hex,
          logoRadius: 360,
        },
        nodeQrCodeOptions: {
          color: {
            dark: contrast,
            light: color.hex,
          },
        },
      }).getCanvas();
      if (cancel) return;
      setDataUrl(result.toDataURL("image/webp", 1));
    }

    calculateQrCode();

    return () => {
      cancel = true;
    };
  }, [imageRef]);
  return (
    <Container>
      <ToPrint dimension={dimension} qrCodeUrl={dataUrl} albumArtUrl={albumArtUrl} ref={componentRef} />
      <Typography variant="h1">QR Code Preview</Typography>
      <img src={dataUrl} alt="qrcode" />
      <div>
        <Typography variant="h1">Album Art Preview</Typography>
        <img src={albumArtUrl} ref={imageRef} alt="album art" crossOrigin="anonymous" />
      </div>
      <Button onClick={() => handlePrint()}>Print this out!</Button>
    </Container>
  );
};

export default PrintPreview;
