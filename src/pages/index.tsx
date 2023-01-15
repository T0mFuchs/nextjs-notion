// @ts-nocheck
import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { notion } from "lib/notion";

import type { GetStaticProps } from "next";
import type {
  GetDatabaseResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

// todo : add types

const ViewList = dynamic(() => import("ui/app/data/list"));
const ViewSinglePage = dynamic(() => import("ui/app/data/page"));

export const getStaticProps: GetStaticProps = async () => {
  const database = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID as string,
  });
  const map = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
  });
  return {
    props: {
      database,
      map,
    },
    revalidate: 10,
  };
};

export default function Page({
  database,
  map,
}: {
  database: GetDatabaseResponse;
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
          notion-integration: {database.title[0].plain_text}/
          {nextPage ? nextPage.properties.Name.title[0].plain_text : null}
        </title>
        <meta
          name="description"
          content={`${database.title[0].plain_text} overview`}
        />
      </Head>
      <h4 pl-1>
        {database ? (
          <>
            {database.title[0].plain_text}
            {nextPage
              ? "/" + nextPage.properties.Name.title[0].plain_text
              : null}
          </>
        ) : null}
      </h4>
      <div grid p-8>
        {nextPage && database ? (
          <ViewSinglePage
            page={nextPage}
            db_res={database}
            open={openNextPage}
            onOpenChange={setOpenNextPage}
          />
        ) : null}
        {map ? (
          <ViewList
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
