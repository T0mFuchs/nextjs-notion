// @ts-nocheck
import React from "react";
import * as D from "@radix-ui/react-dialog";

import css from "./dialog.module.css";

export default function Dialog({
  children,
  open,
  onOpenChange,
  ...props
}: {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <>
      <D.Root open={open} onOpenChange={onOpenChange}>
        <D.Portal>
          <D.Overlay inset-0 fixed className={css.overlay} />
          <D.Content
            fixed
            top="50%"
            left="50%"
            max-w-md
            max-h-fit
            transition
            className={css.content}
            {...props}
          >
            {children}
          </D.Content>
        </D.Portal>
      </D.Root>
    </>
  );
}
