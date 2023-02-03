/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultVoteSelect = Prisma.validator<Prisma.un_votesSelect>()({
  id: false,
  country: true,
  record: true,
  vote: true,
});

export const votesRouter = router({
  voting_record: publicProcedure
    .input(
      z.object({
        record: z.number(),
      }),
    )
    .query(async ({ input }) => {
      return await prisma.un_votes.findMany({
        select: defaultVoteSelect,
        where: { record: { equals: input.record } },
        orderBy: {
          country: 'desc',
        },
      });
    }),

  unique_records: publicProcedure.query(async () => {
    return await prisma.un_votes.groupBy({
      by: ['record'],
    });
  }),
});
