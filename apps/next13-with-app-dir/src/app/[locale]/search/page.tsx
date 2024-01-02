import React, { lazy } from "react";
import axios from "axios";
const ReactApp = lazy(() => import("app/app"));

export const revalidate = 60;

const getStaticProps = async () => {
  const res = await axios("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  const dataRes = res.data;
  return dataRes;
};

async function SearchPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dataRes = await getStaticProps();
  // .then(response => response.json())
  // .then(json => console.log(json))
  return (
    <>
      <div>Testing search - {dataRes.datetime}</div>
      <ReactApp />
    </>
  );
}

export default SearchPage;
