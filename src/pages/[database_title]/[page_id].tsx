// @ts-nocheck
import Head from "next/head";
import { formatDistance } from "date-fns";
import { notion } from "lib/notion";
import { colorHandler } from "lib/color-handler";
import Separator from "ui/radix-ui/separator";
import Label from "ui/radix-ui/label";

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
      params: { database_title: database_title, page_id: page.id },
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
  //console.log("page", page);
  console.log("block", blocks);
  //console.log("comments", comments);
  return (
    <>
      {database_title && page && blocks && comments ? (
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
              <h2 px-2>{page.properties.Name.title[0].plain_text}</h2>
              <div absolute top-14 right-10>
                edited{" "}
                {formatDistance(Date.parse(page.last_edited_time), new Date())}{" "}
                ago
              </div>
              <div flex p-2>
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
                <span flex gap-4 pl-4>
                  {page.properties.Tags.multi_select.map((tag: any) => (
                    <span
                      style={{
                        color: "#0e0c0c",
                        background: colorHandler(tag.color),
                      }}
                      rounded-md
                      text-base
                      h="1.5rem"
                      relative
                      top=".7"
                      px-1
                      key={tag.name}
                    >
                      {tag.name}
                    </span>
                  ))}
                </span>
              </div>
              <Separator orientation="horizontal" />
              {comments && comments.length > 0 ? (
                <div p-2>
                  {comments.map(
                    (comment: CommentObjectResponse, index: number) => (
                      <p key={comment.id} grid>
                        <div p-1>{comment.rich_text[index].plain_text}</div>
                        <div absolute right-10>
                          {formatDistance(
                            Date.parse(comment.last_edited_time),
                            new Date(),
                            { includeSeconds: true }
                          )}{" "}
                          ago
                        </div>
                      </p>
                    )
                  )}
                </div>
              ) : null}
              {blocks && blocks.length > 0 ? (
                <>
                  <Separator orientation="horizontal" />
                  <div rounded bg-dark-800 p-2>
                    {blocks.map(
                      (
                        content: ParagraphBlockObjectResponse
                      ) => (
                            <span key={content.id}>{content.paragraph.rich_text.map((text) => (
                              <p key={text.plain_text}>{text.plain_text}</p>
                            ))}</span>
                      )
                    )}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </>
      ) : (
        <h4 pl-1>loading...</h4>
      )}
    </>
  );
}
