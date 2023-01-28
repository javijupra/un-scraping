/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { votesRouter } from './votes';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  votes: votesRouter,
});

export type AppRouter = typeof appRouter;
