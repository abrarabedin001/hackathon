import React, { useState, useRef } from "react";
import Card from "@mui/material/Card";
import { signIn, signOut, useSession } from "next-auth/react";
import Todo from "~/components/Todo";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";

import {
  Box,
  Toolbar,
  Typography,
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
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import Checkbox from "@mui/material/Checkbox";

export default function Body({
  tasks,
  addTasks,
  teamId,
  deleteTeam,
  changeTeamId,
  deleteTask,
  updateDueDate,
  updateCompleted,
  updatePriority,
  updateTask,
  members,
  deleteMemberFromTeam,
  updatePermission,
}) {
  const taskRef = useRef();
  const updateRef = useRef();
  const { data: session } = useSession();
  let AutoLabel = [{ label: "EDIT" }, { label: "ADMIN" }, { label: "VIEW" }];

  const handleSubmit = () => {
    addTasks({
      name: taskRef?.current.value,
      userId: session.user.id,
      teamId: teamId,
    });
  };

  console.log("MEMBERS/////////////////////////////");
  console.log(members);

  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Box className="flex-column">
          <div className="flex">
            <Button
              variant="contained"
              size="medium"
              sx={{ width: 0.5 / 6 }}
              onClick={() => {
                deleteTeam({ id: teamId });
                changeTeamId("");
              }}
            >
              Delete Team
            </Button>
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
                        <ListItemButton
                          onClick={(e) => {
                            console.log("zzzzzzz");
                            deleteMemberFromTeam({
                              userId: member.user.id,
                              teamId: teamId,
                            });
                          }}
                        >
                          X
                        </ListItemButton>
                        <Autocomplete
                          key={member.userId}
                          disablePortal
                          id="combo-box-demo"
                          options={AutoLabel}
                          sx={{ width: 180 }}
                          // onChange={(e) => {
                          //   (e.target.innerText){
                          //     updatePermission({
                          //       userId: member.userId,
                          //       teamId: member.teamId,
                          //       permission: e.target.innerText,
                          //     });
                          //   }
                          onChange={(e) => {
                            console.log("hell//////////////////////");
                            if (e.target.innerText) {
                              // console.log("ki hoise");
                              // console.log(e.target.innerText);
                              // console.log(e.target);
                              updatePermission({
                                userId: member.userId,
                                teamId: member.teamId,

                                permissions: e.target.innerText,
                              });
                            }
                          }}
                          // }}
                          renderInput={(params) => (
                            <TextField
                              key={member.userId}
                              {...params}
                              label={member.permissions}
                            />
                          )}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
          </div>

          <div className="m-6">
            <TextField
              id="outlined-basic3"
              label="To Do"
              variant="outlined"
              sx={{ width: 2.5 / 4, mr: "20px" }}
              inputRef={taskRef}
            />
            <Button
              variant="contained"
              size="medium"
              sx={{ width: 0.5 / 6 }}
              onClick={() => {
                handleSubmit();
              }}
            >
              ADD
            </Button>
          </div>
        </Box>
        {tasks?.map((el) => {
          return (
            <Todo
              el={el}
              deleteTask={deleteTask}
              updateDueDate={updateDueDate}
              updateCompleted={updateCompleted}
              updatePriority={updatePriority}
              updateTask={updateTask}
              teamId={teamId}
              members={members}
            />
          );
        })}
      </Box>
    </>
  );
}
