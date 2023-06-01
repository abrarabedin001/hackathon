import React from "react";
import LeftPanel from "./LeftPanel";
import { signIn, signOut, useSession } from "next-auth/react";

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";

const drawerWidth = 240;
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function NavigationBar() {
  const { data: session } = useSession();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Navigation Bar
          </Typography>
          <Box sx={{ flexGrow: 1 }} />{" "}
          {/* Use flexGrow: 1 to push the Avatar to the rightmost corner */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={session?.user.image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => ( */}
              <MenuItem
                key="Profile"
                onClick={() => {
                  signOut({ callbackUrl: "http://localhost:3000/" });
                }}
              >
                <Typography textAlign="center">Sign Out</Typography>
              </MenuItem>

              {/* ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
