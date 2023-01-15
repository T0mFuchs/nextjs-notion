// @ts-nocheck
import Head from "next/head";
import { notion } from "lib/notion";
import { getPageTitle } from "lib/notion/helper";

import type {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const source = ctx.params?.database_title as string;
  const page_id = ctx.params?.page_id as string;
  const page: any = await notion.pages.retrieve({ page_id: page_id });
  return {
    props: {
      source,
      page,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.NODE_ENV === "development") {
    return {
      paths: [],
      fallback: true,
    };
  } else {
    const database_title = (
      await notion.databases.retrieve({
        database_id: process.env.NOTION_DATABASE_ID as string,
      })
    ).title[0].plain_text;
    const pages = (
      await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID as string,
      })
    ).results;
    const paths = pages.map((page: any) => ({
      params: { page_id: page.id, database_title: database_title },
    }));
    return {
      paths: paths,
      fallback: true,
    };
  }
};

export default function Page({ database_title, page }: { database_title: string; page: any }) {
  return (
    <>
      {database_title && page ? (
        <>
          <Head>
            <title>
              notion-integration: {`${database_title}/${getPageTitle(page)}`}
            </title>
            <meta
              name="description"
              content={`${database_title}/${getPageTitle(page)}`}
            />
          </Head>
          <h4 pl-1>
            {database_title}/{getPageTitle(page)}
          </h4>
          <div grid p-2 pt-4>
            <h2>{getPageTitle(page)}</h2>
            <p>id: {page.id}</p>
          </div>
        </>
      ) : (
        <h4 pl-1>loading...</h4>
      )}
    </>
  );
}
