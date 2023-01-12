// @ts-nocheck // todo : remove when types are added and proper syntax solution for unocss attributify
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { notion } from "lib/notion";
import { getPageTitle } from "lib/notion/helper";

import { GetStaticProps } from "next";

// todo : add types

export const getStaticProps: GetStaticProps = async () => {
  const map = (
    await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID as string,
    })
  ).results;
  return {
    props: {
      map,
    },
    revalidate: 10,
  };
};

export default function Page({ map }: { map: any }) {
  return (
    <>
      <Head>
        <title>notion-integration</title>
      </Head>
      {map ? (
        <div grid justify-center pt-2>
          {map.map((item) => (
            <div key={item.id} leading-loose px-px>
              <div text="[20px]">
                <Link
                  hover:text-red
                  focus:text-red
                  hover:border-current
                  focus:border-current
                  relative
                  left-1
                  prefetch={false}
                  href={`/${item.id}`}
                >
                  <span i-mdi-file relative top="-.5" />
                  {`-`}
                  <span relative left=".5">
                    {getPageTitle(item)}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div grid justify-center pt-4>
          loading...
        </div>
      )}
    </>
  );
}
