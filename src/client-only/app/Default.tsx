import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import ToPrint from "../../components/ToPrint";
import QrCodeWithLogo from "qrcode-with-logos";

const Default: React.FC = () => {
  const [dataUrl, setDataUrl] = useState("");
  const [albumArtUrl, setAlbumArtUrl] = useState("https://i.scdn.co/image/ab67616d0000b2735f4b254ce294586f239596eb");
  const [dimension] = useState("20cm");
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    let cancel = false;

    async function calculateQrCode() {
      let result = await new QrCodeWithLogo({
        content: "https://songwhip.com/nu-3/we-love-the-sun",
        width: 3000,
        logo: {
          src: "https://i.scdn.co/image/c3f834aba5e8b10ccb2145f2b64f77a9ef7035c4",
          logoRadius: 180,
        },
      }).getCanvas();
      if (cancel) return;
      setDataUrl(result.toDataURL("image/webp", 1));
    }

    calculateQrCode();

    return () => {
      cancel = true;
    };
  }, []);
  return (
    <Container>
      <ToPrint dimension={dimension} qrCodeUrl={dataUrl} albumArtUrl={albumArtUrl} ref={componentRef} />
      <Typography variant="h1">QR Code Preview</Typography>
      <img src={dataUrl} alt="qrcode" />
      <div>
        <Typography variant="h1">Album Art Preview</Typography>
        <img src={albumArtUrl} alt="album art" />
      </div>
      <Button onClick={() => handlePrint()}>Print this out!</Button>
    </Container>
  );
};

export default Default;
