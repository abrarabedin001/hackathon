import React, { useState, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { Box, Toolbar, Typography, TextField, Button } from "@mui/material";

export default function Body({
  tasks,
  addTasks,
  teamId,
  deleteTeam,
  changeTeamId,
}) {
  const taskRef = useRef();
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
          return <div className="text-white">{el.name}</div>;
        })}
      </Box>
    </>
  );
}
