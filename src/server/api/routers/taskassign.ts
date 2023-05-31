import { contextProps } from "@trpc/react-query/shared";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const taskAssignRouter = createTRPCRouter({
  insert: protectedProcedure
    .input(
      z.object({
        userId: z.string(),

        name: z.string(),
        teamId: z.string().optional(),
        priority: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
        dueDate: z.date().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.create({
        data: {
          ...input,
        },
      });
    }),

  assignUser: protectedProcedure
    .input(
      z.object({
        taskid: z.string().optional(),
        assignedTo: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.taskAssigned.create({
        data: {
          userId: input.assignedTo,
          taskId: input.taskid,
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany();
  }),
  getFromSingleUser: protectedProcedure
    .input(z.object({ userid: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.taskAssigned.findMany({
        where: {
          userId: input.userid,
        },
      });
    }),
  getFromSingleTask: protectedProcedure
    .input(z.object({ taskid: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.taskAssigned.findMany({
        where: {
          taskId: input.taskid,
        },
        include: { user: true },
      });
    }),
  updateAssignment: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
        taskId: z.string(),
        permission: z.enum(["EDIT", "ADMIN", "VIEW"]),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.taskAssigned.update({
        where: {
          id: input.id,
        },
        data: {
          permission: input.permission,
          id: input.id,
          task: {
            connect: { id: input.taskId }, // Specify the team you want to connect
          },

          user: {
            connect: { id: input.userId }, // Specify the team you want to connect
          },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.taskAssigned.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
