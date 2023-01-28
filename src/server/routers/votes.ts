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
  list: publicProcedure
    .input(
      z.object({
        record: z.number(),
      }),
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const items = await prisma.un_votes.findMany({
        select: defaultVoteSelect,
        // get an extra item at the end which we'll use as next cursor
        // take: limit + 1,
        where: { record: { equals: input.record } },
        orderBy: {
          country: 'desc',
        },
      });

      return {
        items: items.reverse(),
      };
    }),
});
