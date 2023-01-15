// @ts-nocheck
import Head from "next/head";
import { notion } from "lib/notion";
import { getPageTitle } from "lib/notion/helper";

import type {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";
import type {
  BlockObjectResponse,
  CommentObjectResponse,
  ListCommentsResponse,
  PageObjectResponse,
  ParagraphBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const database_title = ctx.params?.database_title as string;
  const page_id = ctx.params?.page_id as string;
  const page = await notion.pages.retrieve({ page_id: page_id });
  const block = (
    await notion.blocks.children.list({ block_id: page_id, page_size: 50 })
  ).results;
  const comments = (await notion.comments.list({ block_id: page_id })).results;
  return {
    props: {
      database_title,
      page,
      block,
      comments,
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

export default function Page({
  database_title,
  page,
  block,
  comments,
}: {
  database_title: string;
  page: PageObjectResponse;
  block: BlockObjectResponse[];
  comments: ListCommentsResponse[];
}) {
  console.log("page", page);
  console.log("block", block);
  console.log("comments", comments);
  return (
    <>
      {database_title && page && block ? (
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
          <div grid p-8>
            <h2>{getPageTitle(page)}</h2>
            <div flex>
              <span i-mdi-format-list-bulleted relative top=".5" />
              <span pl-1 pr-4>
                Tags
              </span>
              <span flex gap-4>
                {page.properties.Tags.multi_select.map((tag: any) => (
                  <span
                    style={{ color: "#0e0c0c", background: tag.color }}
                    rounded-md
                    text-center
                    key={tag.name}
                  >
                    {tag.name}
                  </span>
                ))}
              </span>
            </div>
            <div p-2>
              {comments.map((comment: CommentObjectResponse, index: number) => (
                <p key={comment.id}>
                  <div></div>
                  <div>{comment.rich_text[index].plain_text}</div>
                </p>
              ))}
            </div>
            <div p-2>
              {block.map(
                (content: ParagraphBlockObjectResponse, index: number) => (
                  <p key={content.id}>
                    {content.paragraph.rich_text[index].plain_text}
                  </p>
                )
              )}
            </div>
          </div>
        </>
      ) : (
        <h4 pl-1>loading...</h4>
      )}
    </>
  );
}
