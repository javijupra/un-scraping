import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import { inferProcedureInput } from '@trpc/server';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import type { AppRouter } from '~/server/routers/_app';
import { Button } from 'antd';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import stc from 'string-to-color';

const IndexPage: NextPageWithLayout = () => {
  const utils = trpc.useContext();
  const record_input = useState(671311);
  const votesQuery = trpc.votes.list.useQuery({
    record: record_input[0],
  });

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   const allPosts = votesQuery.data?.pages.flatMap((page) => page.items) ?? [];
  //   for (const { id } of allPosts) {
  //     void utils.post.byId.prefetch({ id });
  //   }
  // }, [votesQuery.data, utils]);

  return (
    <>
      <ComposableMap>
        <Geographies
          geography={
            'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'
          }
        >
          {({ geographies }) => {
            // votesQuery.data?.items.filter((vote) => {
            //   console.log(vote.country);
            // return vote.country === geo.properties.name.toUpperCase();
            // });
            console.log(votesQuery.data?.items.length);
            console.log('---------------------');
            let count = 0;
            geographies.map((geo) => {
              const vote = votesQuery.data?.items.filter((vote) => {
                return vote.country === geo.properties.name.toUpperCase();
              });
              count = count + (vote && vote.length > 0 ? 1 : 0);
            });
            console.log(count);
            return geographies.map((geo) => {
              // console.log(geo);
              // console.log(vote.country);
              // console.log(geo.properties.name.toUpperCase());
              // const vote = votesQuery.data?.items.filter((vote) => {
              //   console.log(vote.country);
              //   return vote.country === geo.properties.name.toUpperCase();
              // });
              // console.log(vote);
              return (
                <Geography
                  style={{
                    default: {
                      fill: '#D6D6DA',
                      outline: 'none',
                    },
                    hover: {
                      fill: '#F53',
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#E42',
                      outline: 'none',
                    },
                  }}
                  key={geo.rsmKey}
                  geography={geo}
                />
              );
            });
          }}
        </Geographies>
      </ComposableMap>
      <h2>{record_input[0]}</h2>
      {votesQuery.data?.items.map((vote, index) => (
        <Fragment key={index}>
          <article>
            <h3>
              {vote.country}: {vote.vote}
            </h3>
            {/* <Button /> */}
          </article>
        </Fragment>
      ))}
    </>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createProxySSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.post.all.fetch();
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
