import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { taskRouter } from "./routers/task";
import { authRouter } from "./routers/auth";
import { teamRouter } from "./routers/team";
import { userTeamRouter } from "./routers/userteam";
import { userRouter } from "./routers/user";
import { taskAssignRouter } from "./routers/taskassign";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  task: taskRouter,
  auth: authRouter,
  team: teamRouter,
  userteam: userTeamRouter,
  user: userRouter,
  taskassign:taskAssignRouter
});
// api.task.getall()
// export type definition of API
export type AppRouter = typeof appRouter;
