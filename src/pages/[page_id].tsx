import notion from "lib/notion";
import { NotionPage } from "ui/NotionPage";

import type { GetServerSideProps, GetServerSidePropsContext } from "next";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { page_id } = context.params as { page_id: string };
  const page = await notion.pages.retrieve({
    page_id,
  });
  return {
    props: {
      page,
    },
  };
};

export default function Page({ page }: { page: any }) {
  return <NotionPage pageObject={page} />;
}
