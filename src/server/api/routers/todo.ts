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

      return ctx.prisma.todo.create({
        data: {
          userId: ctx.session.user.id,
          todo: input.text
        }
      })
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany();

  }),

  delete: protectedProcedure.input(z.object({ text: z.string() })).mutation(({ ctx, input }) => {
    return ctx.prisma.todo.delete({
      where: {
        id: input.text,
      }
    })
  }),
});
