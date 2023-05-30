import * as React from "react";
import LeftPanel from "~/components/LeftPanel";
import NavigationBar from "~/components/NavigationBar";
import Body from "~/components/Body";

import { Box, CssBaseline } from "@mui/material";

// import { createTheme, ThemeProvider } from "@mui/material/styles";

// const theme = createTheme({
//   typography: {
//     fontFamily: "Georgia",
//   },
// });

export default function Tasks() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavigationBar />
        <LeftPanel />
        <Body />
      </Box>
    </>
  );
}
