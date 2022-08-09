// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { ZodError } from "zod";
import { prisma } from "../db/client";

export const createContext = (opts?: trpcNext.CreateNextContextOptions) => {
  const req = opts?.req;
  const res = opts?.res;

  return {
    req,
    res,
    prisma,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>().formatError(({ shape, error, type }) => {
  return {
    ...shape,
    data: {
      ...shape.data,
      type,
      message: error.message,
      zodError:
        error.code === 'BAD_REQUEST' &&
          error.cause instanceof ZodError
          ? error.cause.flatten()
          : null,
    }
  }
}
);

