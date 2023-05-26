import { contextProps } from "@trpc/react-query/shared";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  insert: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.team.create({ data: {} });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany();
  }),

  delete: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.delete({
        where: {
          id: input.text,
        },
      });
    }),
});
