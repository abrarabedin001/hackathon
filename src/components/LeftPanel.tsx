import React, { useState, useRef } from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";
import { signIn, signOut, useSession } from "next-auth/react";

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
import { api } from "~/utils/api";
import { Session } from "inspector";
const drawerWidth = 240;
// const tabs = ["Personal", "Team 1", "Team 2", "Team 3"];
// const members = ["Member 1", "Member 2", "Member 3", "Member 4", "Member 5"];

export default function LeftPanel({
  teams,
  submitcreateTeam,
  teamId,
  changeTeamId,
  users,
  members,
  addMembers,
}) {
  let memberName = useRef();
  let teamName = useRef();

  const utils = api.useContext();
  const { data: session } = useSession();

  // const { mutateAsync: findUser } = api.useteam.findUser.useQuery({});

  // let [usersAuto,setUsersAuto] = useState("")
  let AutoLabel = [{ label: "" }];
  const emailList = users?.map((str) => {
    const { id, email } = str;

    if (id != session?.user.id) {
      return { label: email };
    } else {
      return { label: "" };
    }
  });
  const nameList = users?.map((str) => {
    const { id, name } = str;
    if (id != session?.user.id) {
      return { label: name, id: id };
    } else {
      return { label: "" };
    }
  });
  console.log(emailList);
  if (nameList) {
    if (nameList) {
      AutoLabel = [...emailList, ...nameList];
    }
  }
  console.log("members/////////////");

  console.log(members);

  function handleSubmit(e) {
    e.preventDefault();
    submitcreateTeam(teamName.current.value);
  }

  function handleSubmitMember(e) {
    e.preventDefault();
    const input = e.target.innerText;
    let id = null;
    let user = null;
    console.log(input);
    if (input?.includes("@")) {
      user = users.filter((el) => {
        return el.email === input;
      });
    } else {
      user = users.filter((el) => {
        return el.name === input;
      });
    }
    if (user) {
      console.log(user[0].id);
      const id = user[0].id;
      console.log(teamId);

      addMembers({
        teamId: teamId,
        userId: id,
      });
    }

    // return user;
  }
  function handleChange(e) {
    console.log(e);
  }

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (index: number, id: string) => {
    setSelectedIndex(index);
    changeTeamId(id);
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
          {teams?.map((el, index) => (
            <ListItem key={el.id} disablePadding>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => handleListItemClick(index, el.id)}
              >
                <ListItemIcon>
                  {index === 0 ? <PersonIcon /> : <GroupsIcon />}
                </ListItemIcon>
                <ListItemText primary={el.name} />
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
                inputRef={teamName}
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
              {members?.map((member) => {
                return (
                  <ListItem key={member.userId} disablePadding>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar n°${member}`}
                          src={`/static/images/avatar/${member}.jpg`}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={`${member.user.name}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>

            <form
              onSubmit={handleSubmitMember}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <TextField
                id="outlined-basic"
                label="Add Member"
                variant="outlined"
                placeholder="Username"
              /> */}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={AutoLabel}
                sx={{ width: 180 }}
                onChange={(e) => {
                  handleSubmitMember(e);

                  // console.log("autocomplete");
                  // console.log(e.target.innerText);
                  // console.log(e.target);
                  // console.log(user);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="UserName/Email" />
                )}
              />
            </form>
          </AccordionDetails>
        </Accordion>
      </Drawer>
    </>
  );
}
