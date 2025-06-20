import { getCommon } from "@/api/common";
import React from "react";

export default async function Common() {
  const data = await getCommon();
  return (
    <div className="flex flex-col text-3xl items-center mt-20">
      <p>{data?.message}</p>
    </div>
  );
}
