import { hash } from "bcryptjs";
import { z } from "zod";

import { prisma } from "@finance-app/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @finance-app/auth package
    return "you can see this secret message!";
  }),
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async (opts) => {
      if (opts.input.password && opts.input.email) {
        const { email, password, name } = opts.input;
        const hashedPassword = await hash(password, 12);

        const user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            name,
          },
        });

        return user;
      }

      return "Failed!";
    }),
});
