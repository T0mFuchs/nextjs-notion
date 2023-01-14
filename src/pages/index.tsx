// @ts-nocheck
import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { notion } from "lib/notion";
import { getPageTitle } from "lib/notion/helper";

import { GetStaticProps } from "next";
import type {
  GetDatabaseResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

// todo : add types

const ViewPages = dynamic(() => import("ui/app/data/pages"));
const ViewPage = dynamic(() => import("ui/app/data/page"));

export const getStaticProps: GetStaticProps = async () => {
  const source = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID as string,
  });
  const map = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
  });
  return {
    props: {
      source,
      map,
    },
    revalidate: 10,
  };
};

export default function Page({
  source,
  map,
}: {
  source: GetDatabaseResponse;
  map: QueryDatabaseResponse;
}) {
  const [openNextPage, setOpenNextPage] = React.useState(false);
  const [nextPage, setNextPage]: any = React.useState(null);
  React.useEffect(() => {
    if (!openNextPage && nextPage) {
      setNextPage(null);
    }
  }, [nextPage, openNextPage]);
  return (
    <>
      <Head>
        <title>
          notion-integration: {source ? source.title[0].plain_text : null}
        </title>
        <meta
          name="description"
          content={`${source.title[0].plain_text} overview`}
        />
      </Head>
      <h4 pl-1>
        {source ? (
          <>
            {source.title[0].plain_text}
            {nextPage ? "/" + getPageTitle(nextPage) : null}
          </>
        ) : null}
      </h4>
      <div grid p-2 pt-4>
        {nextPage && source ? (
          <ViewPage
            page={nextPage}
            source={source}
            open={openNextPage}
            onOpenChange={setOpenNextPage}
          />
        ) : null}
        {map ? (
          <ViewPages
            pages={map}
            open={openNextPage}
            onOpenChange={setOpenNextPage}
            setNextPage={setNextPage}
          />
        ) : null}
      </div>
    </>
  );
}
