import { contextProps } from "@trpc/react-query/shared";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  insert: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.create({
        data: {
          userId: ctx.session.user.id,
          name: input.text,
        },
      });
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
