import { contextProps } from "@trpc/react-query/shared";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  insert: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        // isCompleted: z.boolean(),
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
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        dueDate: z.date().optional(),
        isComplete: z.boolean().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          DueDate: input.dueDate,
          isCompleted: input.isComplete,
          // TaskAssigned: {
          //   create: [
          //     {
          //       user: {
          //         connect: {
          //           id: input.assignedTo,
          //         },
          //       },
          //     },
          //   ],
          // },
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
          userId:input.assignedTo,
          taskId: input.taskid
        },
      });
    }),

  completed: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          isCompleted: true,
        },
      });
    }),
  unCompleted: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          isCompleted: false,
        },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany();
  }),
  getFromSingleUser: protectedProcedure
    .input(z.object({ userid: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findMany({
        where: {
          userId: input.userid,
        },
      });
    }),
  getFromSingleTeam: protectedProcedure
    .input(z.object({ teamid: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findMany({
        where: {
          teamId: input.teamid,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
