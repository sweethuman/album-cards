/** @jsx jsx */
import * as React from "react";
import { jsx, css } from "@emotion/react";

type Props = {
  dimension: string;
  qrCodeUrl: string;
  albumArtUrl: string;
};

const ToPrint = React.forwardRef<HTMLDivElement, Props>(({ dimension, qrCodeUrl, albumArtUrl }, ref) => {
  return (
    <div
      ref={ref}
      css={css`
        display: none;
        @media print {
          display: block;
        }
      `}>
      <img
        src={qrCodeUrl}
        css={css`
          border: 2px black dashed;
          @media print {
            width: ${dimension};
            height: ${dimension};
        `}
        alt="QRCode Album Art"
      />
      <img
        src={albumArtUrl}
        css={css`
          border: 2px black dashed;
          @media print {
            width: ${dimension};
            height: ${dimension};
        `}
        alt="Album Art"
      />
    </div>
  );
});

export default ToPrint;
