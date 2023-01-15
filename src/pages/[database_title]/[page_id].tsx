// @ts-nocheck
import Head from "next/head";
import { notion } from "lib/notion";
import { colorHandler } from "lib/color-handler";
import { Label } from "@radix-ui/react-label";

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
  const blocks = (
    await notion.blocks.children.list({ block_id: page_id, page_size: 50 })
  ).results;
  const comments = (await notion.comments.list({ block_id: page_id })).results;
  return {
    props: {
      database_title,
      page,
      blocks,
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
  blocks,
  comments,
}: {
  database_title: string;
  page: PageObjectResponse;
  blocks: BlockObjectResponse[];
  comments: ListCommentsResponse[];
}) {
  console.log("page", page);
  console.log("block", blocks);
  console.log("comments", comments);
  return (
    <>
      {database_title && page && blocks ? (
        <>
          <Head>
            <title>
              notion-integration:{" "}
              {`${database_title}/${page.properties.Name.title[0].plain_text}`}
            </title>
            <meta
              name="description"
              content={`${database_title}/${page.properties.Name.title[0].plain_text}`}
            />
          </Head>
          <h4 pl-1>
            {database_title}/{page.properties.Name.title[0].plain_text}
          </h4>
          <div grid p-8>
            <div border-solid border=".5" border-neutral-800 rounded>
              <h2>{page.properties.Name.title[0].plain_text}</h2>
              <div flex>
                <span
                  bg-transparent
                  border-0
                  rounded-md
                  hover:bg-neutral-800
                  focus:bg-neutral-800
                  focus:animate-pulse
                  hover:border-current
                  focus:border-current
                >
                  <span
                    i-mdi-format-list-bulleted
                    relative
                    top="-.5"
                    left=".5"
                  />
                  <Label px-1>Tags:</Label>
                </span>
                <span flex gap-4 pl-8>
                  {page.properties.Tags.multi_select.map((tag: any) => (
                    <span
                      style={{
                        color: "#0e0c0c",
                        background: colorHandler(tag.color),
                      }}
                      px-1
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
                {comments.map(
                  (comment: CommentObjectResponse, index: number) => (
                    <p key={comment.id}>
                      <div></div>
                      <div>{comment.rich_text[index].plain_text}</div>
                    </p>
                  )
                )}
              </div>
              <div p-2>
                {blocks.map(
                  (content: ParagraphBlockObjectResponse, index: number) => (
                    <p key={content.id}>
                      {content.paragraph.rich_text[index].plain_text}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <h4 pl-1>loading...</h4>
      )}
    </>
  );
}
