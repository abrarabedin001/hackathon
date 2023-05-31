import React, { useState, useRef } from "react";
import Card from "@mui/material/Card";
import { signIn, signOut, useSession } from "next-auth/react";
import dayjs from "dayjs";

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

  let AutoLabel = [{ label: "HIGH" }, { label: "MEDIUM" }, { label: "LOW" }];
  console.log("tasks");
  console.log(tasks);

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
        </form>
        {tasks?.map((el) => {
          return (
            <Box className="flex-column m-3 border p-5 text-white">
              <div className="m-4 flex">
                <Checkbox
                  checked={el.isCompleted}
                  onClick={(e) => {
                    console.log("just clicked");
                    updateCompleted({
                      id: el.id,
                      completed: !el.isCompleted,
                    });
                  }}
                />

                <TextField
                  id="outlined-basic3"
                  label={el.name}
                  variant="outlined"
                  sx={{ width: 2.5 / 4, mr: "20px" }}
                  // placeholder={el.name}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setTimeout(() => {
                      updateTask({ id: el.id, name: e.target.value });
                    }, 1000);
                    // console.log(updateRef.current.value);
                  }}
                />
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ width: 0.5 / 6 }}
                  onClick={(e) => {
                    deleteTask({ id: el.id });
                  }}
                >
                  X
                </Button>
              </div>
              <div className="m-4 flex">
                <Autocomplete
                  key={el.id}
                  disablePortal
                  id="combo-box-demo"
                  options={AutoLabel}
                  sx={{ width: 180 }}
                  onChange={(e) => {
                    updatePriority({ id: el.id, priority: e.target.innerText });
                  }}
                  renderInput={(params) => (
                    <TextField key={el.id} {...params} label={el.priority} />
                  )}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    defaultValue={dayjs(el.DueDate)}
                    onChange={(newValue) => {
                      var date = new Date();
                      date.toISOString(
                        newValue["$y"],
                        newValue["$M"],
                        newValue["$D"]
                      );
                      updateDueDate({
                        id: el.id,
                        dueDate: date,
                      });
                    }}
                  />
                </LocalizationProvider>
              </div>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
