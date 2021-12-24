import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import ToPrint from "../../components/ToPrint";
import QrCodeWithLogo from "qrcode-with-logos";
import FastAverageColor from "fast-average-color";
const { contrastColor } = require("contrast-color");

const Default: React.FC = () => {
  const [dataUrl, setDataUrl] = useState("");
  const [albumArtUrl, setAlbumArtUrl] = useState("https://i.scdn.co/image/ab67616d0000b273b6fd138ec84f89c20e2a9883");
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
        content: "https://songwhip.com/nu-3/we-love-the-sun",
        width: 3000,
        logo: {
          src: "https://i.scdn.co/image/c3f834aba5e8b10ccb2145f2b64f77a9ef7035c4",
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

export default Default;
