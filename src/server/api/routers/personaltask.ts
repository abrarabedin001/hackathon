import { contextProps } from "@trpc/react-query/shared";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const personaltaskRouter = createTRPCRouter({
  insert: protectedProcedure
    .input(
      z.object({
        userId: z.string().optional(),

        name: z.string(),

        priority: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
        dueDate: z.date().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.personalTask.create({
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
      return ctx.prisma.personalTask.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          DueDate: input.dueDate,
          isCompleted: input.isComplete,
        },
      });
    }),
  updatePriority: protectedProcedure
    .input(
      z.object({
        id: z.string(),

        priority: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.personalTask.update({
        where: {
          id: input.id,
        },
        data: {
          priority: input.priority,
        },
      });
    }),
  updateDueDate: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        dueDate: z.date().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.personalTask.update({
        where: {
          id: input.id,
        },
        data: {
          DueDate: input.dueDate,
        },
      });
    }),
  updateName: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.personalTask.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    }),

  updateCompleted: protectedProcedure
    .input(z.object({ id: z.string(), completed: z.boolean() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.personalTask.update({
        where: {
          id: input.id,
        },
        data: {
          isCompleted: input.completed,
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
    return ctx.prisma.personalTask.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  getFromSingleUser: protectedProcedure
    .input(z.object({ userid: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.personalTask.findMany({
        where: {
          userId: input.userid,
        },
      });
    }),
  getFromSingleTeam: protectedProcedure
    .input(z.object({ teamid: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.personalTask.findMany({
        where: {
          teamId: input.teamid,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.personalTask.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
