import React, { useState } from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";

import {
  Drawer,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

const drawerWidth = 240;
const tabs = ["Personal", "Team 1", "Team 2", "Team 3"];
const members = ["Member 1", "Member 2", "Member 3", "Member 4", "Member 5"];

export default function LeftPanel() {
  function handleSubmit() {
    console.log();
  }

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />

        <List disablePadding>
          {tabs.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => handleListItemClick(index)}
              >
                <ListItemIcon>
                  {index === 0 ? <PersonIcon /> : <GroupsIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Accordion
          sx={{
            "&.Mui-expanded": { margin: 0, border: "1px solid" },
          }}
        >
          <AccordionSummary
            expandIcon={<GroupAddIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Create Team</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Team Name"
                variant="outlined"
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ mt: "15px" }}
                fullWidth
                size="medium"
              >
                Create
              </Button>
            </form>
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{ "&.Mui-expanded": { margin: 0, border: "1px solid" } }}
        >
          <AccordionSummary
            expandIcon={<AddIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Members</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {members.map((name) => {
                return (
                  <ListItem key={name} disablePadding>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar n°${name}`}
                          src={`/static/images/avatar/${name}.jpg`}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={`${name}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Add Member"
                variant="outlined"
                placeholder="Username"
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ mt: "15px" }}
                fullWidth
                size="medium"
              >
                ADD
              </Button>
            </form>
          </AccordionDetails>
        </Accordion>
      </Drawer>
    </>
  );
}
