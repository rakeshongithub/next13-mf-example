import { createPageRoutes, transformStateCity } from "@/src/utils/common";
import React from "react";
// import { notFound } from "next/navigation";
// import State from "@/src/components/template/State";

export const revalidate = 60;
// export const dynamic = 'error';
// export const dynamicParams = true;

export async function generateStaticParams() {
  // const { stateLists } = transformStateCity();
  // return createPageRoutes(stateLists);
  return []
}

async function getData() {
  console.log('[State Page] ===========> init getData method');
  const res = await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
  const dataRes = await res.json();
  console.log(dataRes, '[State Page] =====================datares')
  return {
    datetime: dataRes.datetime, //new Date(dataRes.datetime).toLocaleDateString()
  }
}

export default async function StatePage({params: {locale, state}}: {params: {locale: string, state: string}}) {

  // if(state !== "arizona") {
  //   notFound();
  // }

  const response = await getData();
  console.log('[State Page] ===========> received getData method response <======', {response});

  return (
    <>
      <div>{response.datetime}</div>
      {/* <State locale={locale} state={state} /> */}
    </>
  );
}
