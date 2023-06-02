import { type } from "os";
import { any } from "zod";
import dayjs from "dayjs";
import { api } from "~/utils/api";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Checkbox,
  Card,
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
import Autocomplete from "@mui/material/Autocomplete";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { signIn, signOut, useSession } from "next-auth/react";

const PersonalTodo = ({
  el,
  deleteTask,
  updateDueDate,
  updateCompleted,
  updatePriority,
  updateTask,
  teamId,
  members,
  permission,
}) => {
  const utils = api.useContext();
  const { data: session } = useSession();



  let AutoLabel = [{ label: "HIGH" }, { label: "MEDIUM" }, { label: "LOW" }];

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
              onChange={(e) => {
                console.log(e.target.value);
                setTimeout(() => {
                  updateTask({ id: el.id, name: e.target.value });
                }, 1000);
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
                value={dayjs(el.DueDate)}
                onChange={(newValue) => {
                  const date = new Date(
                    newValue["$y"],
                    newValue["$M"],
                    newValue["$D"]
                  );
                  date.toISOString();
                  updateDueDate({
                    id: el.id,
                    dueDate: date,
                  });
                }}
              />
            </LocalizationProvider>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default PersonalTodo;
