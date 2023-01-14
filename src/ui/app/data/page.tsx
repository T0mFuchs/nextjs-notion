// @ts-nocheck
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import { getPageTitle } from "lib/notion/helper";

const loadMinFeatures = () =>
  import("lib/lazy/min-features").then((res) => res.default);

const Dialog = dynamic(() => import("ui/radix-ui/dialog"));
const Separator = dynamic(() => import("ui/radix-ui/separator"));
const AccessibleIcon = dynamic(() => import("ui/radix-ui/accessible-icon"));
const MDiv = dynamic(() => import("ui/framer-motion/m/div"));
const AnimatePresence = dynamic(
  () => import("ui/framer-motion/animate-presence")
);
const LazyMotion = dynamic(() => import("ui/framer-motion/lazy-motion"));

export default function ViewPage({
  page,
  source,
  open,
  onOpenChange,
}: {
  page: any;
  source: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <React.Suspense>
      <AnimatePresence mode="popLayout">
        {open ? (
          <Dialog open={open} onOpenChange={onOpenChange}>
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
                <Separator orientation="vertical" />
                <h2>
                  <Link
                    href={`${source.title[0].plain_text.toString()}/${page.id}`}
                    outline-none
                    no-underline
                    text-blue-400
                    focus:text-blue-700
                    hover:text-blue-700
                    focus:animate-pulse
                  >
                    <AccessibleIcon label="link-icon">
                      <span i-mdi-link-variant relative left--1 />
                    </AccessibleIcon>
                    {getPageTitle(page)}
                  </Link>
                </h2>
                <p>id: {page.id}</p>
              </MDiv>
            </LazyMotion>
          </Dialog>
        ) : null}
      </AnimatePresence>
    </React.Suspense>
  );
}
