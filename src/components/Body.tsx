import React from "react";

import { Box, Toolbar, Typography, TextField, Button } from "@mui/material";

export default function Body() {
  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <form
          style={{
            display: "flex",
          }}
        >
          <TextField
            id="outlined-basic"
            label="To Do"
            variant="outlined"
            sx={{ width: 2.5 / 4, mr: "20px" }}
          ></TextField>
          <Button
            variant="contained"
            size="medium"
            sx={{ width: 0.5 / 6 }}
            type="submit"
          >
            ADD
          </Button>
        </form>
      </Box>
    </>
  );
}
