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
    .mutation(async ({ ctx, input }) => {
      const teamsList = await ctx.prisma.team.findMany({
        where: { creatorId: input.creatorid },
      });

      if (teamsList?.length > 3) {
        return new Response("No more teams can be created.");
      }
      const team = ctx.prisma.team.create({
        data: {
          name: input.name,
          creatorId: input.creatorid,
          noTeamMembers: 0,
        },
      });
      return team;
    }),
  getAllFromSameCreator: publicProcedure
    .input(z.object({ creatorId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.team.findMany({
        where: {
          creatorId: input.creatorId,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.team.findMany();
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.team.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
