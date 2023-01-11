import React from "react";
import notion from "lib/notion";
import Link from "next/link";

import { getPageTitle } from "lib/notion/helper";

import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const map = (
    await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID as string,
    })
  ).results;
  return {
    props: {
      map,
    },
  };
};

// todo : add types

export default function Page({ map }: { map: any }) {
  return (
    // @ts-ignore
    <div grid justify-center>
      {map.map((item: any) => (
        <div key={item.id} px-px>
          <Link prefetch={false} href={`/${item.id}`}>
            {getPageTitle(item)}
          </Link>
          <div>test</div>
        </div>
      ))}
    </div>
  );
}
