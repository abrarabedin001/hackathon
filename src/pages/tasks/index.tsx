import * as React from "react";
import LeftPanel from "~/components/LeftPanel";
import NavigationBar from "~/components/NavigationBar";
import Body from "~/components/Body";
import PersonalBody from "~/components/PersonalBody";
import { api } from "~/utils/api";
import { Box, CssBaseline } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Tasks() {
  const utils = api.useContext();
  const [teamId, changeTeamId] = React.useState("");
  const { data: session } = useSession();
  const [personal, setPersonal] = React.useState(true);

  const { data: Teams } = api.team.getAllFromSameCreator.useQuery({
    creatorId: session?.user.id,
  });

  const { data: Users } = api.user.getAll.useQuery({
    creatorId: session?.user.id,
  });

  const { data: Members } = api.userteam.getAll.useQuery({
    teamId: teamId,
  });

  const { mutateAsync: updatePermission } =
    api.userteam.updatePermission.useMutation({
      onSuccess(input) {
        void utils.userteam.getAll.invalidate();
      },
    });
  // updatePermission
  const { data: otherTeams } = api.userteam.getAllForSameUser.useQuery({
    userId: session?.user.id,
  });

  const { mutateAsync: decideUserTeam } =
    api.userteam.decideUserTeam.useMutation({
      onSuccess(input) {
        void utils.userteam.getAllForSameUser.invalidate();
      },
    });
  const { mutateAsync: deleteMemberFromTeam } = api.userteam.delete.useMutation(
    {
      onSuccess(input) {
        void utils.userteam.getAll.invalidate();
      },
    }
  );

  const { mutateAsync: createTeam } = api.team.insert.useMutation({
    onSuccess(input) {
      void utils.team.getAllFromSameCreator.invalidate();
    },
  });
  const { mutateAsync: addMembers } = api.userteam.addUser.useMutation({
    onSuccess(input) {
      void utils.userteam.getAll.invalidate();
    },
  });

  const { data: Tasks } = api.task.getFromSingleTeam.useQuery({
    teamid: teamId,
  });

  const { mutateAsync: addTasks } = api.task.insert.useMutation({
    onSuccess(input) {
      void utils.task.getFromSingleTeam.invalidate();
    },
  });
  const { mutateAsync: updateTask } = api.task.updateName.useMutation({
    onSuccess(input) {
      void utils.task.getFromSingleTeam.invalidate();
    },
  });
  const { mutateAsync: updateDueDate } = api.task.updateDueDate.useMutation({
    onSuccess(input) {
      void utils.task.getFromSingleTeam.invalidate();
    },
  });
  const { mutateAsync: updateCompleted } = api.task.updateCompleted.useMutation(
    {
      onSuccess(input) {
        void utils.task.getFromSingleTeam.invalidate();
      },
    }
  );
  const { mutateAsync: updatePriority } = api.task.updatePriority.useMutation({
    onSuccess(input) {
      void utils.task.getFromSingleTeam.invalidate();
    },
  });
  ///////////////////////////////////////
  const { data: PersonalTasks } = api.personaltask.getAll.useQuery();

  const { mutateAsync: PersonaladdTasks } = api.personaltask.insert.useMutation(
    {
      onSuccess(input) {
        void utils.personaltask.getAll.invalidate();
      },
    }
  );
  const { mutateAsync: PersonalupdateTask } =
    api.personaltask.updateName.useMutation({
      onSuccess(input) {
        void utils.personaltask.getAll.invalidate();
      },
    });
  const { mutateAsync: PersonalupdateDueDate } =
    api.personaltask.updateDueDate.useMutation({
      onSuccess(input) {
        void utils.personaltask.getAll.invalidate();
      },
    });
  const { mutateAsync: PersonalupdateCompleted } =
    api.personaltask.updateCompleted.useMutation({
      onSuccess(input) {
        void utils.personaltask.getAll.invalidate();
      },
    });
  const { mutateAsync: PersonalupdatePriority } =
    api.personaltask.updatePriority.useMutation({
      onSuccess(input) {
        void utils.personaltask.getAll.invalidate();
      },
    });
  const { mutateAsync: PersonaldeleteTask } =
    api.personaltask.delete.useMutation({
      onSuccess(input) {
        void utils.personaltask.getAll.invalidate();
      },
    });

  ////////////////////////////////////////

  const { mutateAsync: deleteTeam } = api.team.delete.useMutation({
    onSuccess(input) {
      void utils.team.getAllFromSameCreator.invalidate();
    },
  });
  const { mutateAsync: deleteTask } = api.task.delete.useMutation({
    onSuccess(input) {
      void utils.task.getFromSingleTeam.invalidate();
    },
  });

  const submitcreateTeam = (teamName) => {
    void createTeam({ name: teamName, creatorid: session.user.id });
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavigationBar />
        <LeftPanel
          teams={Teams}
          submitcreateTeam={submitcreateTeam}
          teamId={teamId}
          changeTeamId={changeTeamId}
          users={Users}
          members={teamId === "" ? [] : Members}
          addMembers={addMembers}
          otherTeams={otherTeams}
          decideUserTeam={decideUserTeam}
          deleteMemberFromTeam={deleteMemberFromTeam}
          personal={personal}
          setPersonal={setPersonal}
        />
        {teamId != "" ? (
          <Body
            personal={personal}
            personaltasks={PersonalTasks}
            tasks={Tasks}
            addTasks={addTasks}
            teamId={teamId}
            deleteTeam={deleteTeam}
            changeTeamId={changeTeamId}
            deleteTask={deleteTask}
            updateDueDate={updateDueDate}
            updateCompleted={updateCompleted}
            updatePriority={updatePriority}
            updateTask={updateTask}
            members={teamId === "" ? [] : Members}
            deleteMemberFromTeam={deleteMemberFromTeam}
            updatePermission={updatePermission}
          />
        ) : (
          " "
        )}
        {personal ? (
          <PersonalBody
            personal={personal}
            personaltasks={PersonalTasks}
            tasks={PersonalTasks}
            addTasks={PersonaladdTasks}
            // teamId={teamId}
            // deleteTeam={PersonaldeleteTeam}
            // changeTeamId={PersonalchangeTeamId}
            deleteTask={PersonaldeleteTask}
            updateDueDate={PersonalupdateDueDate}
            updateCompleted={PersonalupdateCompleted}
            updatePriority={PersonalupdatePriority}
            updateTask={PersonalupdateTask}
            // members={teamId === "" ? [] : Members}
            // deleteMemberFromTeam={deleteMemberFromTeam}
            // updatePermission={updatePermission}
          />
        ) : (
          ""
        )}
      </Box>
    </>
  );
}
