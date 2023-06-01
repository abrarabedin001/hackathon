import React, { useState, useRef, useEffect } from "react";
import Card from "@mui/material/Card";
import { signIn, signOut, useSession } from "next-auth/react";
import PersonalTodo from "~/components/PersonalTodo";
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

export default function PersonalBody({
  tasks,
  addTasks,
  //   teamId,
  //   deleteTeam,
  //   changeTeamId,
  deleteTask,
  updateDueDate,
  updateCompleted,
  updatePriority,
  updateTask,
  //   members,
  //   deleteMemberFromTeam,
  //   updatePermission,
}) {
  const taskRef = useRef();
  const updateRef = useRef();
  const [permission, setPermission] = useState("VIEW");
  const { data: session } = useSession();
  let AutoLabel = [{ label: "EDIT" }, { label: "ADMIN" }, { label: "VIEW" }];
  console.log("tasks/////////////////");
  console.log(tasks);
  const handleSubmit = () => {
    console.log(taskRef?.current.value);
    addTasks({
      name: taskRef?.current.value,
      userId: session.user.id,
    });
  };

  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Box className="flex-column">
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
            <PersonalTodo
              el={el}
              deleteTask={deleteTask}
              updateDueDate={updateDueDate}
              updateCompleted={updateCompleted}
              updatePriority={updatePriority}
              updateTask={updateTask}
              //   teamId={teamId}
              //   members={members}
              //   permission={permission}
            />
          );
        })}
      </Box>
    </>
  );
}
