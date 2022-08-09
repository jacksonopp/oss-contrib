import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";
import { z, ZodError } from "zod";
import { trpc } from "../../utils/trpc";
import { createRouter } from "./context";

export const formRouter = createRouter()
  .mutation("create", {
    input: z
      .object({
        name: z.string(),
        username: z.string(),
        email: z.string().email(),
      }),
    async resolve({ input }) {
      try {
        return await prisma?.contributor.create({
          data: {
            name: input.name,
            username: input.username,
            email: input.email,
          }
        });
      } catch (e) {
        // prisma error
        if (e instanceof PrismaClientKnownRequestError) {
          console.log(e.code);
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: `${(e as any).meta?.target[0] === "email" ? "Email: " + input.email : "Username: " + input.username} already exists.`,
            });
          }
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal server error",
          cause: e,
        })
      }
    }
  })