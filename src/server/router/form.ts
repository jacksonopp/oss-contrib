import { z } from "zod";
import { createRouter } from "./context";

export const formRouter = createRouter()
  .mutation("create", {
    input: z
      .object({
        name: z.string(),
        username: z.string(),
        email: z.string(),
      }),
    async resolve({input}) {
      return await prisma?.contributor.create({
        data: {
          name: input.name,
          username: input.username,
          email: input.email,
        }
      })
    }
  })