export function getPageTitle(page: any) {
  return page.properties.Name.title[0].plain_text as string;
}
