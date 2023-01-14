// @ts-nocheck // todo : remove when types are added and proper syntax solution for unocss attributify
import React from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { notion } from "lib/notion";
import { getPageTitle } from "lib/notion/helper";

import { GetStaticProps } from "next";

// todo : add types

const loadMinFeatures = () =>
  import("lib/lazy/min-features").then((res) => res.default);
const LazyMotion = dynamic(() => import("ui/framer-motion/lazy-motion"), {
  ssr: false,
});
const AnimatePresence = dynamic(
  () => import("ui/framer-motion/animate-presence"),
  { ssr: false }
);
const Separator = dynamic(() => import("ui/radix-ui/separator"), {
  ssr: false,
});
const MDiv = dynamic(() => import("ui/framer-motion/m/div"), { ssr: false });
const MButton = dynamic(() => import("ui/framer-motion/m/button"), {
  ssr: false,
});

export const getStaticProps: GetStaticProps = async () => {
  const map = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
  });
  const source = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID as string,
  });
  return {
    props: {
      map,
      source,
    },
    revalidate: 10,
  };
};

export default function Page({ map, source }: { map: any; source: any }) {
  const [openNextPage, setOpenNextPage] = React.useState(false);
  const [nextPage, setNextPage] = React.useState(null);
  return (
    <>
      <Head>
        <title>{source ? source.title[0].plain_text : null}</title>
      </Head>
      {source ? (
        <h4 justify-start pl-1>
          {source.title[0].plain_text}
        </h4>
      ) : null}
      <div grid grid-flow-col>
        {map ? (
          <div grid gap-2 justify-center pt-2>
            {map.results.map((item) => (
              <div key={item.id} leading-loose>
                <button
                  text="[20px]"
                  bg-transparent
                  border-0
                  rounded
                  hover:bg-neutral-800
                  focus:bg-neutral-800
                  focus:animate-pulse
                  hover:border-current
                  focus:border-current
                  relative
                  left-1
                  outline-none
                  cursor-pointer
                  onClick={() => {
                    setNextPage(item);
                    setOpenNextPage(true);
                  }}
                >
                  <span i-mdi-file relative top="-.5" />
                  <span
                    relative
                    border-solid
                    border-0
                    border-b
                    border-neutral-800
                    left=".5"
                  >
                    {getPageTitle(item)}
                  </span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div grid justify-center pt-4 animate-pulse>
            loading...
          </div>
        )}
        <React.Suspense>
          <AnimatePresence>
            {openNextPage && nextPage ? (
              <LazyMotion features={loadMinFeatures}>
                <MDiv
                  variants={{
                    initial: {
                      opacity: 0.5,
                      x: 100,
                      transition: { duration: 0.15, ease: "easeIn" },
                    },
                    animate: {
                      opacity: 1,
                      x: 0,
                    },
                    exit: {
                      opacity: 0,
                      x: 100,
                      transition: { duration: 0.15, ease: "easeOut" },
                    },
                  }}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Separator orientation="vertical" />
                  <MButton
                    relative
                    left--2
                    i-mdi-close
                    border-0
                    text="[32px]"
                    hover:bg-red
                    focus:bg-red
                    focus:animate-pulse
                    cursor-pointer
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => {
                      setOpenNextPage(false);
                      setNextPage(null);
                    }}
                  />
                  <h2>
                    <Link
                      href={`/${nextPage.id}`}
                      outline-none
                      no-underline
                      text-blue-400
                      focus:text-blue-700
                      hover:text-blue-700
                      focus:animate-pulse
                    >
                      <span i-mdi-link-variant relative left--1 />
                      {getPageTitle(nextPage)}
                    </Link>
                  </h2>
                  <p>{nextPage.id}</p>
                </MDiv>
              </LazyMotion>
            ) : null}
          </AnimatePresence>
        </React.Suspense>
      </div>
    </>
  );
}
