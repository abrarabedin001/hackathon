import { contextProps } from "@trpc/react-query/shared";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
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



  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
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
