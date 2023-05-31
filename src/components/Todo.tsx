import { type } from "os";
import { any } from "zod";
import dayjs from "dayjs";
import { api } from "~/utils/api";

import {
  Box,
  Toolbar,
  Typography,
  TextField,
  Button,
  Checkbox,
  Card,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { signIn, signOut, useSession } from "next-auth/react";

const Todo = ({
  el,
  deleteTask,
  updateDueDate,
  updateCompleted,
  updatePriority,
  updateTask,
  teamId,
}) => {
  const utils = api.useContext();
  const { data: session } = useSession();

  const { data: assigned } = api.taskassign.getFromSingleTask.useQuery({
    taskid: el.id,
  });
  console.log("Task Assigned");
  console.log(assigned);

  const { mutateAsync: assignTask } = api.taskassign.assignUser.useMutation({
    onSuccess(input) {
      void utils.taskassign.getFromSingleTask.invalidate();
    },
  });
  const { mutateAsync: deleteAssignment } = api.taskassign.delete.useMutation({
    onSuccess(input) {
      void utils.taskassign.getFromSingleTask.invalidate();
    },
  });
  const { mutateAsync: updateAssignment } =
    api.taskassign.updateAssignment.useMutation({
      onSuccess(input) {
        void utils.taskassign.getFromSingleTask.invalidate();
      },
    });

  const { data: Members } = api.userteam.getAll.useQuery({
    teamId: teamId,
  });

  function handleSubmitAssign(e) {
    e.preventDefault();
    const input = e.target.innerText;

    const user = Members.filter((el) => {
      return el.user.email === input;
    });
    console.log("User");
    console.log(user[0]?.user.id);
    assignTask({
      taskid: el.id,
      assignedTo: user[0]?.user.id,
    });
  }

  // return user;

  const assignPeople = Members?.map((el) => {
    return {
      label: el.user.email,
      email: el.user.email,
      name: el.user.name,
      id: el.user.id,
    };
  });

  let AutoLabel = [{ label: "HIGH" }, { label: "MEDIUM" }, { label: "LOW" }];
  let PermissionLabel = [
    { label: "ADMIN" },
    { label: "EDIT" },
    { label: "VIEW" },
  ];
  return (
    <>
      <Box className="m-3 flex-row  p-5 text-white">
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
                updatePriority({
                  id: el.id,
                  priority: e.target.innerText,
                });
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
        <Box id="right-panel" className="flex-column m-3 border p-5 text-white">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={assignPeople}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
            onChange={(e) => {
              if (e.target.innerText) {
                handleSubmitAssign(e);
              }
            }}
          />
          {assigned?.map((el) => {
            return (
              <Card className="m-2 flex p-2">
                <Card className="mx-4">{el.user.email} </Card>

                {/* <Autocomplete
                  key={el.id}
                  disablePortal
                  id="combo-box-demo"
                  options={PermissionLabel}
                  sx={{ width: 180 }}
                  onChange={(e) => {
                    // updatePriority({
                    //   id: el.id,
                    //   priority: e.target.innerText,
                    // });
                    console.log("update permission");
                    updateAssignment({
                      id: el.id,
                      permission: e.target.innerText,
                      taskId: el.taskId,
                      userId: el.userId,
                    });
                    // if(e.target.innerText?){ updateAssignment({id:el.id,permission:e.target.innerText})}
                  }}
                  renderInput={(params) => (
                    <TextField key={el.id} {...params} label={el.priority} />
                  )}
                /> */}
                <Button
                  onClick={() => {
                    deleteAssignment({ id: el.id });
                  }}
                >
                  X
                </Button>
              </Card>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default Todo;
