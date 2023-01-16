import * as S from "@radix-ui/react-separator";

import css from "./index.module.css";

export default function Separator({
  orientation,
  ...props
}: {
  orientation: "horizontal" | "vertical";
}) {
  return <S.Root orientation={orientation} className={css.root} {...props} />;
}
