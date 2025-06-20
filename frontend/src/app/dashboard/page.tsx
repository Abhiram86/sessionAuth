import { getDashboard } from "@/api/dashboard";
import { headers } from "next/headers";
import React from "react";

export default async function Dashboard() {
  const headersList = await headers();
  const cookie = headersList.get("cookie");

  console.log(cookie);

  const data = await getDashboard(cookie || "");
  return (
    <div className="flex flex-col text-3xl items-center text-center mt-20">
      {data ? (
        <p>{data.message}</p>
      ) : (
        <p>you need to be logged in to access this route</p>
      )}
    </div>
  );
}
