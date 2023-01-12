import React from "react";
import * as A from "@radix-ui/react-dialog";

import css from "./dialog.module.css";

export default function AlertDialog({
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
      <A.Root open={open} onOpenChange={onOpenChange}>
        <A.Portal>
          <A.Overlay className={css.overlay} />
          <A.Content className={css.content} {...props}>
            {children}
          </A.Content>
        </A.Portal>
      </A.Root>
    </>
  );
}
