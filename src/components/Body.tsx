import React, { useState, useRef } from "react";
import Card from "@mui/material/Card";
import { signIn, signOut, useSession } from "next-auth/react";
import Todo from "~/components/Todo";

import {
  Box,
  Toolbar,
  Typography,
  TextField,
  Button,
  Checkbox,
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
}) {
  const taskRef = useRef();
  const updateRef = useRef();
  const { data: session } = useSession();



  const handleSubmit = () => {
    addTasks({
      name: taskRef?.current.value,
      userId: session.user.id,
      teamId: teamId,
    });
  };

  console.log("tasks");
  console.log(tasks);

  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Box className="flex-column">
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
            />
          );
        })}
      </Box>
    </>
  );
}
