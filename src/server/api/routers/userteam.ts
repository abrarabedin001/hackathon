import { contextProps } from "@trpc/react-query/shared";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const userTeamRouter = createTRPCRouter({
  findUser: protectedProcedure
    .input(
      z.object({
        email: z.string().optional(),
        name: z.string().optional(),
        teamId: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({
        where: {
          OR: [{ name: input.name }, { email: input.email }],
        },
      });
    }),
  addUser: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let userTeams = await ctx.prisma.userTeam.findMany({
        where: {
          teamId: input.teamId,
          userId: input.userId,
        },
      });

      if (userTeams.length >= 5) {
        return new Response("no more people can be invited");
      }

      let userTeam = ctx.prisma.userTeam.create({
        data: {
          teamId: input.teamId,
          userId: input.userId,
        },
      });
      return userTeam;
    }),
  updateUserTeam: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        userId: z.string(),
        permissions: z.enum(["ADMIN", "EDIT", "VIEW"]),
        inviteAccepted: z.enum(["UNDECIDED", "ACCEPTED", "DENIED"]),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.userTeam.update({
        where: {
          teamId_userId: {
            teamId: input.teamId,
            userId: input.userId,
          },
        },
        data: {
          team: {
            connect: { id: input.teamId }, // Specify the team you want to connect
          },

          user: {
            connect: { id: input.userId }, // Specify the team you want to connect
          },
          permissions: input.permissions,
          inviteAccepted: input.inviteAccepted,
        },
      });
    }),
  decideUserTeam: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        userId: z.string(),
        inviteAccepted: z.enum(["UNDECIDED", "ACCEPTED", "DENIED"]),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.userTeam.update({
        where: {
          teamId_userId: {
            teamId: input.teamId,
            userId: input.userId,
          },
        },
        data: {
          team: {
            connect: { id: input.teamId }, // Specify the team you want to connect
          },
          user: {
            connect: { id: input.userId }, // Specify the team you want to connect
          },
          inviteAccepted: input.inviteAccepted,
        },
      });
    }),

  getAll: publicProcedure
    .input(z.object({ teamId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.userTeam.findMany({
        where: {
          teamId: input.teamId,
        },
        include: {
          user: true,
        },
      });
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
