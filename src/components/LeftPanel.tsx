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

const drawerWidth = 240;

export default function LeftPanel({
  teams,
  submitcreateTeam,
  teamId,
  changeTeamId,
  users,
  members,
  addMembers,
  otherTeams,
  decideUserTeam,
  personal,
  setPersonal,
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

  if (nameList) {
    if (nameList) {
      AutoLabel = [...emailList, ...nameList];
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    submitcreateTeam(teamName.current.value);
  }

  function handleSubmitMember(e) {
    e.preventDefault();
    const input = e.target.innerText;
    if (input) {
      let id = null;
      let user = null;

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
        const id = user[0].id;

        addMembers({
          teamId: teamId,
          userId: id,
        });
      }
    }

    // return user;
  }

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (index: number, id: string) => {
    setPersonal(false);
    setSelectedIndex(index);
    changeTeamId(id);
  };

  const deleteTeamComp = (id: string) => {
    console.log("dlete");
    // deleteTeam({ id: id });
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
          <ListItem key="personal" disablePadding>
            <ListItemButton
              // selected={selectedIndex === index}
              onClick={() => setPersonal(true)}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={"Personal"} />
            </ListItemButton>
          </ListItem>
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
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={AutoLabel}
                sx={{ width: 180 }}
                onChange={(e) => {
                  handleSubmitMember(e);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="UserName/Email" />
                )}
              />
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
            <Typography>Other Teams</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List disablePadding>
              {otherTeams?.map((el, index) => (
                <ListItem key={el.id} disablePadding className="flex">
                  <ListItemButton
                    selected={selectedIndex === index}
                    onClick={() => handleListItemClick(index, el.teamId)}
                  >
                    <ListItemIcon>
                      {index === 0 ? <PersonIcon /> : <GroupsIcon />}
                    </ListItemIcon>
                    <ListItemText primary={el.team.name} />
                  </ListItemButton>
                  {el.inviteAccepted === "UNDECIDED" ? (
                    <div>
                      <ListItemButton
                        onClick={() => {
                          decideUserTeam({
                            userId: el.userId,
                            teamId: el.teamId,
                            inviteAccepted: "ACCEPTED",
                          });
                        }}
                      >
                        Accept
                      </ListItemButton>
                      <ListItemButton
                        onClick={() => {
                          decideUserTeam({
                            userId: el.userId,
                            teamId: el.teamId,
                            inviteAccepted: "DENIED",
                          });
                        }}
                      >
                        Reject
                      </ListItemButton>
                    </div>
                  ) : (
                    ""
                  )}
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Drawer>
    </>
  );
}
