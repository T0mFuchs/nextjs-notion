// @ts-nocheck
import React from "react";
import dynamic from "next/dynamic";
import { formatDistance } from "date-fns";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@radix-ui/react-tabs";

import { colorHandler } from "lib/color-handler";
import Separator from "ui/radix-ui/separator";

import type {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

import tabs from "styles/ui/tabs.module.css";

const loadMinFeatures = () =>
  import("lib/lazy/min-features").then((res) => res.default);

const AccessibleIcon = dynamic(() => import("ui/radix-ui/accessible-icon"));
const MDiv = dynamic(() => import("ui/framer-motion/m/div"));
const AnimatePresence = dynamic(
  () => import("ui/framer-motion/animate-presence")
);
const LazyMotion = dynamic(() => import("ui/framer-motion/lazy-motion"));

export default function ViewList({
  pages,
  open,
  onOpenChange,
  setNextPage,
}: {
  pages: QueryDatabaseResponse;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setNextPage: (page: any) => any;
}) {
  return (
    <React.Suspense>
      <Tabs flex flex-col className="md:w-50%" defaultValue="list">
        <TabsList flex flex-shrink gap-1 pb-6>
          <TabsTrigger
            bg-transparent
            border-0
            text-6
            value="list"
            className={tabs.trigger}
          >
            <span i-mdi-format-list-bulleted />
          </TabsTrigger>
          <TabsTrigger
            bg-transparent
            border-0
            text-6
            value="table"
            className={tabs.trigger}
          >
            <span i-mdi-table />
          </TabsTrigger>
        </TabsList>
        <TabsContent flex-grow outline-none value="list">
          <AnimatePresence initial={false} mode="popLayout">
            {open ? null : (
              <LazyMotion features={loadMinFeatures}>
                {pages.results.map(
                  (page: PageObjectResponse, index: number) => (
                    <MDiv
                      variants={{
                        initial: {
                          opacity: 0,
                          x: -50,
                        },
                        animate: {
                          opacity: 1,
                          x: 0,
                        },
                        exit: {
                          opacity: 0,
                          x: -25,
                        },
                      }}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      key={index}
                      p-2
                      leading-loose
                    >
                      <button
                        text="[20px]"
                        bg-transparent
                        border-0
                        rounded
                        hover:bg-neutral-800
                        focus:bg-neutral-800
                        focus:animate-pulse
                        py-2
                        px-4
                        inline-flex
                        w-full
                        outline-none
                        cursor-pointer
                        onClick={() => {
                          onOpenChange(true);
                          setNextPage(page);
                        }}
                      >
                        <AccessibleIcon label="page-icon">
                          <span i-mdi-file relative top-4 left--1 />
                        </AccessibleIcon>
                        <span
                          border-solid
                          border-0
                          border-b
                          border-neutral-800
                          left=".5"
                        >
                          {page.properties.Name.title[0].plain_text}
                        </span>
                        <span grid place-content-end text-xs text-clip>
                          {`
                            ${formatDistance(
                              Date.parse(page.last_edited_time),
                              new Date(),
                              { includeSeconds: true }
                            )} ago
                          `}
                        </span>
                        <span flex w-full justify-end h-7 gap-2>
                          {page.properties.Tags.multi_select.map((tag: any) => (
                            <span
                              style={{
                                color: "#0e0c0c",
                                background: colorHandler(tag.color),
                              }}
                              rounded-md
                              text-base
                              top-1
                              px-1
                              key={tag.name}
                            >
                              {tag.name}
                            </span>
                          ))}
                        </span>
                      </button>
                      {index !== pages.results.length - 1 ? (
                        <div pt-6>
                          <Separator orientation="horizontal" />
                        </div>
                      ) : null}
                    </MDiv>
                  )
                )}
              </LazyMotion>
            )}
          </AnimatePresence>
        </TabsContent>
        <TabsContent flex-grow outline-none value="table">
          <AnimatePresence initial={false} mode="popLayout">
            {open ? null : (
              <LazyMotion features={loadMinFeatures}>
                <MDiv
                  variants={{
                    initial: {
                      opacity: 0,
                      x: -50,
                    },
                    animate: {
                      opacity: 1,
                      x: 0,
                    },
                    exit: {
                      opacity: 0,
                      x: -25,
                    },
                  }}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div
                    // table-head
                    leading-loose
                    pb-2
                  >
                    <div grid grid-cols-4 gap-4 place-content-center>
                      <span>
                        <span i-mdi-sort-alphabetical-variant /> Name
                      </span>
                      <span>
                        <span i-mdi-clock-time-two-outline /> Created
                      </span>
                      <span>
                        <span i-mdi-clock-time-two-outline /> Edited
                      </span>
                      <span>
                        <span i-mdi-format-list-bulleted /> Tags
                      </span>
                    </div>
                  </div>
                  <div
                  // table-body
                  >
                    {pages.results.map((page: any) => (
                      <button
                        grid
                        grid-cols-4
                        gap-4
                        place-content-center
                        w-full
                        bg-transparent
                        border-1
                        border-neutral-800
                        rounded
                        hover:bg-neutral-800
                        focus:bg-neutral-800
                        focus:animate-pulse
                        outline-none
                        cursor-pointer
                        onClick={() => {
                          onOpenChange(true);
                          setNextPage(page);
                        }}
                        key={page.id}
                      >
                        <span>
                          <AccessibleIcon label="page-icon">
                            <span i-mdi-file relative top="-.25" left--1 />
                          </AccessibleIcon>
                          {page.properties.Name.title[0].plain_text}
                        </span>
                        <span>{`
                    ${formatDistance(
                      Date.parse(page.created_time),
                      new Date(),
                      { includeSeconds: true }
                    )} ago
                  `}</span>
                        <span>{`
                    ${formatDistance(
                      Date.parse(page.last_edited_time),
                      new Date(),
                      { includeSeconds: true }
                    )} ago
                  `}</span>
                        <span grid grid-flow-col text-center gap-1>
                          {page.properties.Tags.multi_select.map((tag: any) => (
                            <span
                              key={tag.name}
                              style={{
                                color: "#0e0c0c",
                                background: colorHandler(tag.color),
                              }}
                              rounded-md
                              text-base
                              relative
                              top=".7"
                              px-1
                            >
                              {tag.name}
                            </span>
                          ))}
                        </span>
                      </button>
                    ))}
                  </div>
                </MDiv>
              </LazyMotion>
            )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </React.Suspense>
  );
}
