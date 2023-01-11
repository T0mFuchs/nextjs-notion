import React from "react";
import { getPageTitle } from "lib/notion/helper";

export function NotionPage({ pageObject }: { pageObject: any }) {
  return (
    // @ts-ignore
    <div grid justify-center px-px>
      <h2>{getPageTitle(pageObject)}</h2>
      <p>{pageObject.id}</p>
    </div>
  );
}
