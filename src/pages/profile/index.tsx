import React from "react";
import NavigationBar from "~/components/NavigationBar";
import { signIn, signOut, useSession } from "next-auth/react";

import {
  Box,
  Toolbar,
  Typography,
  AppBar,
  TextField,
  Button,
  Checkbox,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemAvatar,
  Avatar,
  CssBaseline,
} from "@mui/material";

const drawerWidth = 240;

export default function Profile() {
  const { data: session } = useSession();
  return (
    <>
      <NavigationBar title="Profile Settings"></NavigationBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Avatar
          alt="Avatar"
          src={session?.user.image}
          sx={{ width: 200, height: 200 }}
        />
        <form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              margin="normal"
            />
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              margin="normal"
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              margin="normal"
            />
          </Box>
          <Button variant="contained" type="submit">
            Update
          </Button>
        </form>
      </Box>
    </>
  );
}
