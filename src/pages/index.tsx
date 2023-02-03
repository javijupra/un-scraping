import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import { inferProcedureInput } from '@trpc/server';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import type { AppRouter } from '~/server/routers/_app';
import { Button } from 'antd';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
// import stc from 'string-to-color';
import { ProFormSelect } from '@ant-design/pro-form';

const voteColor = (vote: string | undefined) => {
  switch (vote) {
    case 'Y':
      return '#9de485';
    case 'N':
      return '#e66169';
    case 'A':
      return '#E0AC9D';
    case 'X':
      return '#91C4F2';
    default:
      return '#D8D4D5';
  }
};

const correctedCountryName = (country_name: string) => {
  switch (country_name) {
    case 'UNITED STATES OF AMERICA':
      return 'UNITED STATES';
    default:
      return country_name;
  }
};

const IndexPage: NextPageWithLayout = () => {
  const utils = trpc.useContext();
  const [record_selected, setSelectedRecord] = useState(671311);
  const votesQuery = trpc.votes.voting_record.useQuery({
    record: record_selected,
  });
  const allRecordsQuery = trpc.votes.unique_records.useQuery();

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   const allPosts = votesQuery.data?.pages.flatMap((page) => page.items) ?? [];
  //   for (const { id } of allPosts) {
  //     void utils.post.byId.prefetch({ id });
  //   }
  // }, [votesQuery.data, utils]);

  return (
    <>
      <style>{`
        .ant-form-item {
          margin-bottom: 0px;
        }
        .dot {
          height: 25px;
          width: 25px;
          border-radius: 50%;
          margin-right: 0.3em;
        }
        .legend_row {
          display: flex;
          align-items: center;
          margin-bottom: 0.5em;
        }
      `}</style>

      <div style={{ position: 'absolute' }}>
        <ProFormSelect
          name="select_record"
          label={<p style={{ marginLeft: '2vw' }}>Voting Record</p>}
          request={async () =>
            await fetch(
              'http://localhost:3000/api/trpc/votes.unique_records?batch=1&input=%7B%220%22%3A%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D%7D',
            )
              .then((resp) => resp.json())
              .then((data) => {
                return data[0].result.data.json.map((item: any) => ({
                  label: item.record ?? 'no data',
                  value: item.record ?? 'no data',
                }));
              })
          }
          placeholder="Please select a voting record"
          // required={false}
          // rules={[{ required: true, message: 'Please select a voting record' }]}
          fieldProps={{
            onChange: (input) => setSelectedRecord(input),
            defaultValue: 671311,
          }}
          style={{ marginBottom: '0px' }}
        />

        <div style={{ marginTop: '35vh', marginLeft: '2vw' }}>
          <div className="legend_row">
            <span
              className="dot"
              style={{ backgroundColor: voteColor('Y') }}
            ></span>
            Yes
          </div>
          <div className="legend_row">
            <span
              className="dot"
              style={{ backgroundColor: voteColor('N') }}
            ></span>
            No
          </div>
          <div className="legend_row">
            <span
              className="dot"
              style={{ backgroundColor: voteColor('A') }}
            ></span>
            Abstention
          </div>
          <div className="legend_row">
            <span
              className="dot"
              style={{ backgroundColor: voteColor('X') }}
            ></span>
            Non-Voting
          </div>
          <div className="legend_row">
            <span
              className="dot"
              style={{ backgroundColor: voteColor('O') }}
            ></span>
            Not Present
          </div>
        </div>
      </div>
      <ComposableMap
        style={{ marginTop: '-90px' }}
        // projection="geoAlbers"
        // projectionConfig={{ scale: 50, rotate: [0, 0, 0], center: [20, 61] }}
        // preserveAspectRatio="none"
      >
        <Geographies
          geography={
            'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'
          }
        >
          {({ geographies }) => {
            console.log('Number of votes: ' + votesQuery.data?.length);
            let votes = votesQuery.data;
            geographies.map((geo) => {
              votes = votes?.filter((vote) => {
                return vote.country !== geo.properties.name.toUpperCase();
              });
            });
            console.log('Unmatched countries:');
            console.log(votes);

            return geographies.map((geo) => {
              const vote_record = votesQuery.data?.find(
                (vote) =>
                  vote.country ===
                  correctedCountryName(geo.properties.name.toUpperCase()),
              );

              return (
                <Geography
                  style={{
                    default: {
                      //   fill: '#D6D6DA',
                      fill: voteColor(vote_record?.vote),
                      outline: 'none',
                    },
                    hover: {
                      fill: '#ffd56f',
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#f1b72a',
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
