// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { formRouter } from "./form";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("form.", formRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
