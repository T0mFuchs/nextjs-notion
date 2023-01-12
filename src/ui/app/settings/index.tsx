// @ts-nocheck
import React from "react";
import * as P from "@radix-ui/react-popover";
import { LazyMotion, m } from "framer-motion";

const loadMinFeatures = () =>
  import("lib/lazy/min-features").then((res) => res.default);

export default function Settings({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange(open: boolean): void;
}) {
  return (
    <P.Root open={open} onOpenChange={onOpenChange}>
      <P.Trigger asChild>
        <span
          i-mdi-dots-horizontal
          cursor-pointer
          text="[32px]"
          fixed
          right-3
          onClick={() => onOpenChange(!open)}
        />
      </P.Trigger>
      <P.Portal>
        <P.Content
          relative
          outline-none
          rounded-md
          px-1
          text-center
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          <LazyMotion features={loadMinFeatures}>
            <m.div
              variants={{
                initial: {
                  opacity: 0.3,
                  y: -33,
                  transition: { duration: 0.15, ease: "easeIn" },
                },
                animate: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="initial"
              animate="animate"
            >
              <div>test</div>
              <div>pop</div>
              <div>over</div>
            </m.div>
          </LazyMotion>
        </P.Content>
      </P.Portal>
    </P.Root>
  );
}
