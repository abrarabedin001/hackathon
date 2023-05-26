import { contextProps } from "@trpc/react-query/shared";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  insert: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.emailPassword.create({
        data: {
          email: input.email,
          password: input.password,
        },
      });
    }),
});
