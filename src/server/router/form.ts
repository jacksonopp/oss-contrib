import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";
import { prisma } from "../db/client";

export const formRouter = createRouter()
  .mutation("create", {
    input: z
      .object({
        name: z.string(),
        username: z.string(),
        email: z.string().email(),
      }),
    async resolve({ input, ctx }) {
      try {
        console.log("adding user...")
        return await prisma?.contributor.create({
          data: {
            name: input.name,
            username: input.username,
            email: input.email,
          }
        });
      } catch (e) {
        console.log("failed to add user...", e);
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