// @ts-nocheck
import React from "react";
import dynamic from "next/dynamic";
import { getPageTitle } from "lib/notion/helper";

import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const loadMinFeatures = () =>
  import("lib/lazy/min-features").then((res) => res.default);

const AccessibleIcon = dynamic(() => import("ui/radix-ui/accessible-icon"));
const MDiv = dynamic(() => import("ui/framer-motion/m/div"));
const AnimatePresence = dynamic(
  () => import("ui/framer-motion/animate-presence")
);
const LazyMotion = dynamic(() => import("ui/framer-motion/lazy-motion"));

export default function ViewPages({
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
            {pages.results.map((item: any) => (
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
                key={item.id}
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
                  relative
                  left-1
                  outline-none
                  cursor-pointer
                  onClick={() => {
                    onOpenChange(true);
                    setNextPage(item);
                  }}
                >
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
                    {getPageTitle(item)}
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
