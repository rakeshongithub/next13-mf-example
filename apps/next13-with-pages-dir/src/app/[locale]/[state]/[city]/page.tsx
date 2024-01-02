import { transformStateCity, createPageRoutes } from "@/src/utils/common";
import React from "react";

export const revalidate = 3600;

export async function generateStaticParams() {
  // const { stateLists } = transformStateCity();
  // return createPageRoutes(stateLists);
  return []
}

export default async function CityPage({params: {locale}}: {params: {locale: string}}) {
  console.log({city: locale});
  return <div>CityPage - {locale}</div>;
}
