import * as React from "react";
import LeftPanel from "~/components/LeftPanel";
import NavigationBar from "~/components/NavigationBar";
import Body from "~/components/Body";
import { api } from "~/utils/api";
import { Box, CssBaseline } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Tasks() {
  const utils = api.useContext();
  const [teamId, changeTeamId] = React.useState("");
  const { data: session } = useSession();

  const { data: Teams } = api.team.getAllFromSameCreator.useQuery({
    creatorId: session?.user.id,
  });

  const { data: Users } = api.user.getAll.useQuery({
    creatorId: session?.user.id,
  });
  // let Members = [];

  const { data: Members } = api.userteam.getAll.useQuery({
    teamId: teamId,
  });
  // if (teamId != "") {
  //   console.log("TEAMID");
  //   console.log(teamId);
  //   const { data: Members } = api.userteam.getAll.useQuery({
  //     teamId: teamId,
  //   });
  //   console.log("members have been found");
  //   console.log(Members);
  //   // Members = ["zcf", "sdf"];
  // }

  const { mutateAsync: createTeam } = api.team.insert.useMutation({
    onSuccess(input) {
      void utils.team.getAllFromSameCreator.invalidate();
    },
  });
  const { mutateAsync: addMembers } = api.userteam.addUser.useMutation({
    onSuccess(input) {
      void utils.team.getAllFromSameCreator.invalidate();
    },
  });

  const submitcreateTeam = (teamName) => {
    console.log("in submitcreateTeam");
    console.log(teamName);
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
        />
        <Body />
      </Box>
    </>
  );
}
