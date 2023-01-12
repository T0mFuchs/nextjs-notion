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
          <D.Overlay className={css.overlay} />
          <D.Content className={css.content} {...props}>
            {children}
          </D.Content>
        </D.Portal>
      </D.Root>
    </>
  );
}
