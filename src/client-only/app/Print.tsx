import * as React from "react";
import { useLocation } from "@reach/router";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { State } from "../../types/printState";
import { CreateResponse } from "../../types/createResponse";
import PrintPreview from "../../components/PrintPreview";
import axios from "axios";

const Print: React.FC = () => {
  const location = useLocation();
  const state = location.state as State;
  const [createData, setCreateData] = useState<CreateResponse>(null);
  useEffect(() => {
    const controller = new AbortController();
    let cancel = false;

    async function startLoading() {
      try {
        let result = await axios.post(
          "https://music.gheo.workers.dev/api/create",
          {
            country: "US",
            url: state.sourceUrl,
          },
          {
            signal: controller.signal,
          }
        );
        if (cancel) return;
        setCreateData(result.data);
      } catch (e) {
        if (axios.isCancel(e)) {
          return;
        }
        throw e;
      }
    }

    startLoading();
    return () => {
      cancel = true;
      controller.abort();
    };
  }, [state.sourceUrl]);
  return (
    <>
      {createData == null ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress size="5rem" />
        </Box>
      ) : (
        <PrintPreview album={createData.data} />
      )}
    </>
  );
};

export default Print;
