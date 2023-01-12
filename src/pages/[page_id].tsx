// @ts-nocheck
import Head from "next/head";
import { notion } from "lib/notion";
import { getPageTitle } from "lib/notion/helper";
import { NotionPage } from "ui/notion-page";

import type {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const page_id = ctx.params?.page_id as string;
  const page: any = await notion.pages.retrieve({ page_id: page_id });
  return {
    props: {
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
    const pages = (
      await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID as string,
      })
    ).results;
    const paths = pages.map((page: any) => ({
      params: { page_id: page.id },
    }));
    return {
      paths: paths,
      fallback: true,
    };
  }
};

export default function Page({ page }: { page: any }) {
  return (
    <>
      {page ? (
        <>
          <Head>
            <title>{getPageTitle(page)}</title>
          </Head>
          <>
            <NotionPage pageObject={page} />
          </>
        </>
      ) : (
        <div grid justify-center pt-4 animate-pulse>
          loading...
        </div>
      )}
    </>
  );
}
