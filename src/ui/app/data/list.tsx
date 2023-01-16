// @ts-nocheck
import React from "react";
import dynamic from "next/dynamic";
import { formatDistance } from "date-fns";
import { colorHandler } from "lib/color-handler";

import type {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

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
      <AnimatePresence mode="popLayout">
        {open ? null : (
          <LazyMotion features={loadMinFeatures}>
            {pages.results.map((page: PageObjectResponse) => (
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
                key={page.id}
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
                  hover:border-current
                  focus:border-current
                  py-1
                  inline-flex
                  gap-4
                  outline-none
                  cursor-pointer
                  onClick={() => {
                    onOpenChange(true);
                    setNextPage(page);
                  }}
                >
                  <span>
                    <AccessibleIcon label="page-icon">
                      <span i-mdi-file relative top="-.5" />
                    </AccessibleIcon>
                    <span
                      relative
                      border-solid
                      border-0
                      border-b
                      border-neutral-800
                      left=".5"
                    >
                      {page.properties.Name.title[0].plain_text}
                    </span>
                  </span>
                  <span grid grid-flow-col gap-4 pl-6>
                    {page.properties.Tags.multi_select.map((tag: any) => (
                      <span
                        style={{
                          color: "#0e0c0c",
                          background: colorHandler(tag.color),
                        }}
                        rounded-md
                        text-center
                        key={tag.name}
                      >
                        {tag.name}
                      </span>
                    ))}
                    <span relative top="1.4" px-1 text-xs>{formatDistance(Date.parse(page.last_edited_time), new Date(), { includeSeconds: true })}</span>
                  </span>
                </button>
              </MDiv>
            ))}
          </LazyMotion>
        )}
      </AnimatePresence>
    </React.Suspense>
  );
}
