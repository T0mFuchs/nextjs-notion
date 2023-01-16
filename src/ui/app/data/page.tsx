// @ts-nocheck
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type {
  GetDatabaseResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const loadMinFeatures = () =>
  import("lib/lazy/min-features").then((res) => res.default);

const Dialog = dynamic(() => import("ui/radix-ui/dialog"));
const AccessibleIcon = dynamic(() => import("ui/radix-ui/accessible-icon"));
const MDiv = dynamic(() => import("ui/framer-motion/m/div"));
const AnimatePresence = dynamic(
  () => import("ui/framer-motion/animate-presence")
);
const LazyMotion = dynamic(() => import("ui/framer-motion/lazy-motion"));

export default function ViewSinglePage({
  page,
  db_res,
  open,
  onOpenChange,
}: {
  page: PageObjectResponse;
  db_res: GetDatabaseResponse;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <React.Suspense>
      <AnimatePresence mode="popLayout">
        {open ? (
          <Dialog
            w="2/3"
            h="2/3"
            border-solid
            border=".5"
            border-neutral-800
            rounded
            open={open}
            onOpenChange={onOpenChange}
          >
            <LazyMotion features={loadMinFeatures}>
              <MDiv
                variants={{
                  initial: {
                    opacity: 0,
                    x: 75,
                  },
                  animate: {
                    opacity: 1,
                    x: 0,
                  },
                  exit: {
                    opacity: 0,
                    x: 50,
                  },
                }}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <h2 px-2>
                  <Link
                    href={`${db_res.title[0].plain_text}/${page.id}`}
                    outline-none
                    no-underline
                    text-blue-400
                    focus:text-blue-700
                    hover:text-blue-700
                    focus:animate-pulse
                  >
                    <AccessibleIcon label="link-icon">
                      <span i-mdi-link-variant relative left--1 top="-.5" />
                    </AccessibleIcon>
                    {page.properties.Name.title[0].plain_text}
                  </Link>
                </h2>
                <p px-1>id: {page.id}</p>
              </MDiv>
            </LazyMotion>
          </Dialog>
        ) : null}
      </AnimatePresence>
    </React.Suspense>
  );
}
