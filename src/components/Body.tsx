import React, { useState, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { Box, Toolbar, Typography, TextField, Button } from "@mui/material";

export default function Body({ tasks, addTasks, teamId }) {
  const taskRef = useRef();
  const { data: session } = useSession();
  const handleSubmit = () => {
    addTasks({
      name: taskRef?.current.value,
      userId: session.user.id,
      teamId: teamId,
    });
  };

  return (
    <>
      <Box
        component="main"
        sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: 3 }}
      >
        <Toolbar />
        <form
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {/* <TextField
            id="outlined-basic"
            label="To Do"
            variant="outlined"
            sx={{ width: 2.5 / 4, mr: "20px" }}
            inputRef={taskRef}
            onChange={(e) => {
              console.log("change");
              changeinptask(e.target.innerText);
              console.log(inptask);
              console.log(taskRef);
            }}
          ></TextField> */}
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

        
      </Box>
      {tasks?.map((el) => {
        <div>{tasks}</div>;
      })}
    </>
  );
}
