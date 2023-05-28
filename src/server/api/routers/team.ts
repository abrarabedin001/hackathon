import { contextProps } from "@trpc/react-query/shared";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const teamRouter = createTRPCRouter({
  insert: protectedProcedure
    .input(z.object({ name: z.string(), creatorid: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.team.create({
        data: {
          name: input.name,
          creatorId: input.creatorid,
          noTeamMembers: 0,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.team.findMany();
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
