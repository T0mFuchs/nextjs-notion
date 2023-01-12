import React from "react";
import {
  Popover,
  PopoverPortal,
  PopoverContent,
} from "@radix-ui/react-popover";

import css from "./index.module.css";

export default function Settings({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange(open: boolean): void;
}) {
  return (
    <>
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverPortal>
          <PopoverContent className={css.PopoverContent}>
            <div>test</div>
          </PopoverContent>
        </PopoverPortal>
      </Popover>
    </>
  );
}
